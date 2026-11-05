import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('out');
// Guest access must be present in the production export, not only in source.
await readFile(path.join(root, 'dashboard/index.html'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
    if (pathname.endsWith('/')) file = path.join(file, 'index.html');
    const body = await readFile(file);
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(body);
  } catch { res.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
const errors = [];
const requests = [];
const layouts = [];
try {
  browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(90000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => requests.push({ url: request.url(), failure: request.failure() }));
  page.on('response', response => { if (response.status() >= 400) requests.push({ url: response.url(), status: response.status() }); });
  await mkdir('checks/portal-screenshots', { recursive: true });
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.title(), 'In maintenance mode | Masomo Year 3 & 4');
    assert.equal(await page.getByRole('heading', { name: 'Log in to KyU Masomo Portal', includeHidden: true }).count(), 1);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `checks/portal-screenshots/screenshot-${width}.png`, fullPage: true });
    layouts.push(await page.evaluate(() => {
      const box = selector => { const e = document.querySelector(selector), r = e.getBoundingClientRect(), s = getComputedStyle(e); return { x: r.x, y: r.y, width: r.width, height: r.height, fontSize: s.fontSize, padding: s.padding, color: s.color, background: s.backgroundColor }; };
      return { width: innerWidth, pageHeight: document.documentElement.scrollHeight, card: box('.portal-card'), logo: box('.portal-logo img'), section: box('.portal-region'), notice: box('.portal-maintenance'), username: box('#username'), login: box('.portal-login-button'), guest: box('.portal-guest-button') };
    }));
    console.log('PASS portal layout', width);
  }
  await page.getByRole('button', { name: 'Cookies notice', exact: true }).click();
  await page.getByRole('dialog', { name: 'Cookies notice' }).waitFor();
  await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Lost password?', exact: true }).click();
  await page.getByRole('dialog', { name: 'Lost password?' }).waitFor();
  await page.getByLabel('Username or email address', { exact: true }).fill('portal-test');
  await page.getByRole('dialog').getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('status').filter({ hasText: 'Your password has not been changed.' }).waitFor();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  await page.getByLabel('Username', { exact: true }).fill('portal-test');
  await page.getByLabel('Password', { exact: true }).fill('not-a-real-password');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await page.getByText('Please try logging in again when maintenance is complete.', { exact: true }).waitFor();
  assert(!page.url().includes('password'));
  await page.getByRole('button', { name: 'Access as a guest', exact: true }).click();
  await page.getByRole('heading', { name: /Good morning, Alex/ }).waitFor();
  assert.equal(new URL(page.url()).pathname, '/dashboard/');
  await page.waitForLoadState('networkidle');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: /^My courses/ }).click();
  await page.getByRole('heading', { name: 'My courses', exact: true }).waitFor();
  await page.goto(base + '/login/', { waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('link', { name: 'Back to learning', exact: true }).getAttribute('href'), '/dashboard/');
  await page.getByRole('link', { name: 'Explore sample workspace', exact: true }).click();
  await page.getByRole('heading', { name: /Good morning, Alex/ }).waitFor();
  await page.goto(base + '/admin/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Student dashboard', exact: true }).click();
  await page.getByRole('heading', { name: /Good morning, Alex/ }).waitFor();
  assert.deepEqual(errors, []);
  assert.deepEqual(requests, []);
  console.log('PASS cookies, password recovery, maintenance feedback, guest dashboard, course navigation and return links; no browser errors or failed requests');
  await writeFile('checks/portal-results.json', JSON.stringify({ checkedAt: new Date().toISOString(), buildId: (await readFile('.next/BUILD_ID', 'utf8')).trim(), layouts, errors, requests, passed: true }, null, 2));
} catch (error) {
  console.error(error);
  await writeFile('checks/portal-results.json', JSON.stringify({ layouts, errors, requests, error: error.message, passed: false }, null, 2));
  process.exitCode = 1;
} finally {
  const closed = new Promise(resolve => server.close(resolve));
  server.closeAllConnections();
  console.log('Closing portal test browser');
  if (browser) { for (const context of browser.contexts()) await context.close(); console.log('Portal test contexts closed'); await browser.close(); }
  console.log('Portal test browser closed');
  await closed;
  console.log('Portal test server closed');
}
