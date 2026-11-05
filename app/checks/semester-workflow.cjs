// Run against the production export: node checks/semester-workflow.cjs
const {chromium, expect} = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');

async function main() {
  const root = path.resolve(__dirname, '../out');
  const data = fs.readFileSync(path.resolve(__dirname, '../src/lib/data.ts'), 'utf8');
  const resources = JSON.parse(data.match(/export const resources:Resource\[\] = ([\s\S]*?);\r?\n/)[1]);
  const topics = JSON.parse(data.match(/export const topics:Topic\[\] = ([\s\S]*?);\r?\n/)[1]);
  const courses = JSON.parse(data.match(/export const courses:Course\[\] = ([\s\S]*?);\r?\n/)[1]);
  assert.equal(courses.length, 7);
  assert.equal(new Set(topics.map(t => t.id)).size, topics.length);
  assert.equal(new Set(resources.map(r => r.url)).size, resources.length);
  for (const resource of resources) {
    assert(fs.existsSync(path.join(root, resource.url)), `Export missing ${resource.url}`);
    assert(!resource.url.endsWith('.msi'));
  }
  const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.txt':'text/plain', '.json':'application/json', '.pdf':'application/pdf', '.woff2':'font/woff2', '.ico':'image/x-icon'};
  const server = http.createServer((req, res) => {
    let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + name);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const candidates = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  ];
  const executablePath = candidates.find(p => fs.existsSync(p));
  let browser;
  try {
    browser = await chromium.launch({headless:true, ...(executablePath ? {executablePath} : {})});
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const screenshots = path.join(__dirname, 'semester-screenshots');
    fs.mkdirSync(screenshots, {recursive:true});
    await page.goto(base + '/courses/');
    await expect(page.locator('.course-card')).toHaveCount(7);
    for (const course of courses) {
      await page.goto(base + '/courses/?unit=' + course.id);
      await expect(page.locator('.unit-summary h2')).toHaveText(course.title);
      await expect(page.locator('.topic-row')).toHaveCount(course.topics);
      const hrefs = await page.locator('.topic-row').evaluateAll(links => links.map(a => a.getAttribute('href')));
      assert(hrefs.every(href => topics.some(t => href.includes('topic=' + t.id) && t.courseId === course.id)));
    }
    await page.goto(base + '/read/?topic=ai-agents');
    await expect(page.locator('#reader-unit')).toHaveValue('ai');
    await expect(page.locator('.reader-article h2')).toHaveText('Intelligent agents and environments');
    await page.getByRole('button', {name:'Bookmark topic',exact:true}).click();
    await page.getByRole('button', {name:'Mark as complete',exact:true}).click();
    await expect(page.getByRole('button', {name:'Completed',exact:true})).toBeDisabled();
    await page.reload();
    await expect(page.getByRole('button', {name:'Remove bookmark',exact:true})).toBeVisible();
    await expect(page.getByRole('button', {name:'Completed',exact:true})).toBeDisabled();
    await page.getByRole('textbox', {name:'Find within topic'}).fill('agent');
    await expect(page.locator('.reader-article mark').first()).toBeVisible();
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', {name:'Download topic notes',exact:true}).click();
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), 'ai-agents-notes.txt');
    await page.locator('#reader-unit').selectOption('sqa');
    await expect(page.getByRole('button', {name:'Previous topic',exact:true})).toBeDisabled();
    await page.getByRole('button', {name:'Next topic',exact:true}).click();
    await expect(page).toHaveURL(/topic=sqa-quality-models/);
    await page.goBack();
    await expect(page.locator('.reader-article h2')).toHaveText('Introduction to software quality assurance');
    await page.getByRole('tab', {name:'Source PDFs',exact:true}).click();
    const pdfUrl = await page.locator('object.pdf-document').getAttribute('data');
    assert(pdfUrl.startsWith('/notes/sqa/'));
    const pdfResponse = await page.request.get(base + pdfUrl);
    assert.equal(pdfResponse.status(), 200);
    assert((await pdfResponse.body()).subarray(0,5).toString() === '%PDF-');
    await page.goto(base + '/bookmarks/');
    await expect(page.getByRole('heading', {name:'Intelligent agents and environments',exact:true})).toBeVisible();
    await page.goto(base + '/library/?unit=ai');
    await expect(page.getByRole('combobox', {name:'Filter resources by unit'})).toHaveValue('ai');
    await expect(page.getByRole('heading', {name:'Intelligent agents and environments',exact:true})).toBeVisible();
    await expect(page.getByRole('heading', {name:'Introduction to software quality assurance',exact:true})).toHaveCount(0);
    await page.goto(base + '/courses/?unit=ai');
    await expect(page.getByText('1 completed', {exact:true})).toBeVisible();
    await page.goto(base + '/quizzes/?start=stacks');
    await expect(page.getByRole('heading', {name:'Which principle does a stack follow?',exact:true})).toBeVisible();
    await page.getByRole('radio', {name:/Last In, First Out \(LIFO\)/}).check();
    await page.getByRole('button', {name:'Check answer',exact:true}).click();
    await expect(page.locator('.quiz-feedback.correct')).toBeVisible();
    await page.goto(base + '/dashboard/');
    await page.screenshot({path:path.join(screenshots, 'dashboard-desktop.png'),fullPage:true});
    await page.setViewportSize({width:768,height:1000});
    await expect(page.locator('.dashboard-courses .course-card')).toHaveCount(7);
    for (const card of await page.locator('.dashboard-courses .course-card').all()) await expect(card).toBeVisible();
    await page.setViewportSize({width:390,height:844});
    for (const route of ['/courses/','/read/?topic=sys-sockets','/library/?unit=daa']) {
      await page.goto(base + route);
      await page.waitForTimeout(400);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `Horizontal overflow ${route}`);
    }
    await page.goto(base + '/read/?topic=sys-sockets');
    await expect(page.locator('#reader-unit')).toHaveValue('sys');
    await page.screenshot({path:path.join(screenshots, 'reader-mobile.png'),fullPage:true});
    assert.deepEqual(errors, []);
    const result = {checkedAt:new Date().toISOString(), buildId:fs.readFileSync(path.resolve(__dirname, '../.next/BUILD_ID'), 'utf8').trim(), passed:true, units:courses.length, topics:topics.length, documents:resources.length, checked:['all unit contents','source-file integrity','bookmarks and completion persistence','unit navigation and browser back','search highlighting','notes download','PDF response','library filters','legacy quiz','desktop, tablet and mobile layouts','no page script errors']};
    fs.writeFileSync(path.join(__dirname, 'semester-results.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
  } finally {
    const serverClosed = new Promise(resolve => server.close(resolve));
    server.closeAllConnections();
    console.log('Closing test browser');
    if (browser) {
      for (const context of browser.contexts()) await context.close();
      console.log('Test contexts closed');
      await browser.close();
    }
    console.log('Test browser closed');
    await serverClosed;
    console.log('Test server closed');
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
