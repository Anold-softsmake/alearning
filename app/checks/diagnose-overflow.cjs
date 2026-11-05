const {chromium}=require('@playwright/test');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
(async()=>{
const root=path.resolve(__dirname,'../out');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.txt':'text/plain','.pdf':'application/pdf','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let file=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res)});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const executablePath=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p));
const browser=await chromium.launch({headless:true,executablePath});
try{
const page=await browser.newPage({viewport:{width:390,height:844}});
await page.goto(`http://127.0.0.1:${server.address().port}/library/?unit=daa`);
await page.waitForTimeout(1200);
const measure=()=>({width:window.innerWidth,scroll:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('body *')].map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,cls:e.className,text:e.textContent?.slice(0,100),left:r.left,right:r.right,width:r.width,scroll:e.scrollWidth,overflow:getComputedStyle(e).overflowX}}).filter(e=>e.right>window.innerWidth+1||e.left<0)});
console.log(JSON.stringify(await page.evaluate(measure),null,2));
console.log('FIRST RESOURCE',JSON.stringify(await page.locator('.resource-item').first().evaluate(e=>({rect:e.getBoundingClientRect().toJSON(),display:getComputedStyle(e).display,direction:getComputedStyle(e).flexDirection,wrap:getComputedStyle(e).flexWrap,children:[...e.children].map(c=>({tag:c.tagName,rect:c.getBoundingClientRect().toJSON(),basis:getComputedStyle(c).flexBasis,margin:getComputedStyle(c).marginLeft}))})),null,2));
const fix='@media(max-width:575px){.resource-item{display:flex;flex-direction:row;flex-wrap:wrap;align-items:flex-start}.resource-item>div:nth-child(2){flex:1 1 calc(100% - 60px);min-width:0;overflow-wrap:anywhere}.resource-item>[data-slot=button]{margin-left:0;max-width:100%}.resource-item>[data-slot=button]:nth-child(3){margin-left:47px}}';
await page.addStyleTag({content:fix});
console.log('AFTER',JSON.stringify(await page.evaluate(measure),null,2));
await page.screenshot({path:path.join(__dirname,'overflow-after.png'),fullPage:true});
}finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
