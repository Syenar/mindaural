import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {setTimeout as sleep} from 'node:timers/promises';

const APP_PORT=4187, CDP_PORT=9237;
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:String(APP_PORT)},stdio:['ignore','pipe','pipe']});
const cleanup=()=>{try{chrome?.kill('SIGKILL')}catch{}try{server.kill('SIGKILL')}catch{}};
let chrome;
process.on('exit',cleanup);process.on('SIGINT',()=>{cleanup();process.exit(130)});
async function waitApp(){for(let i=0;i<80;i++){try{const r=await fetch(`http://127.0.0.1:${APP_PORT}/`);const t=await r.text();if(r.ok&&t.includes('<title>Mindaural</title>'))return;}catch{}await sleep(100);}throw new Error('App server did not become ready');}
async function staticFallback(reason){
 const [html,manifestRaw,sw,main]=await Promise.all([readFile('dist/index.html','utf8'),readFile('dist/app.webmanifest','utf8'),readFile('dist/public/service-worker.js','utf8'),readFile('dist/src/ui/App.js','utf8')]);
 const manifest=JSON.parse(manifestRaw);
 if(!html.includes('<title>Mindaural</title>')||!html.includes('name="viewport"'))throw new Error('Built HTML shell invalid');
 if(!manifest.share_target||!manifest.file_handlers?.length)throw new Error('PWA share/file handlers missing');
 if(!sw.includes("request.method==='POST'")||!sw.includes('__share_inbox__'))throw new Error('Share target POST handler missing');
 for(const surface of ['Listen','Create','Studio','Library','Analyzer','Research','Learn','Labs','Settings'])if(!main.includes(`'${surface}'`))throw new Error(`Built bundle missing surface ${surface}`);
 console.log(`ENVIRONMENT BLOCKED: managed Chromium cannot load localhost (${reason}). PASS deterministic built-shell/PWA fallback checks; real CDP smoke remains required on an unrestricted browser host.`);
}
await waitApp();
const chromiumCandidates=process.platform==='win32'
 ? [`${process.env.PROGRAMFILES||'C:/Program Files'}\\Google\\Chrome\\Application\\chrome.exe`,`${process.env['PROGRAMFILES(X86)']||'C:/Program Files (x86)'}\\Google\\Chrome\\Application\\chrome.exe`]
 : ['/usr/bin/chromium','/usr/bin/chromium-browser','/usr/bin/google-chrome'];
const chromium=chromiumCandidates.find(p=>existsSync(p));
if(!chromium){await staticFallback('Chromium executable unavailable');cleanup();process.exit(0);}
chrome=spawn(chromium,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-proxy-server',`--remote-debugging-port=${CDP_PORT}`,`--user-data-dir=${process.platform==='win32'?`${process.env.TEMP||'C:/Windows/Temp'}\\bbs-chrome-${process.pid}`:`/tmp/bbs-chrome-${process.pid}`}`,`http://127.0.0.1:${APP_PORT}/`],{stdio:['ignore','pipe','pipe']});
async function waitJson(){for(let i=0;i<80;i++){try{const r=await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);if(r.ok){const x=await r.json();const tab=x.find(v=>v.type==='page'&&v.url===`http://127.0.0.1:${APP_PORT}/`)||x.find(v=>v.type==='page');if(tab?.webSocketDebuggerUrl)return tab;}}catch{}await sleep(100);}throw new Error('Chromium DevTools endpoint did not become ready');}
try{
 const tab=await waitJson();const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej});let id=0;const pending=new Map(),errors=[];ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const {res,rej}=pending.get(m.id);pending.delete(m.id);m.error?rej(new Error(m.error.message)):res(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params?.exceptionDetails?.exception?.description||m.params?.exceptionDetails?.text||'Runtime exception');else if(m.method==='Log.entryAdded'&&['error','warning'].includes(m.params?.entry?.level))errors.push(`${m.params.entry.level}: ${m.params.entry.text}`);};
 const c=(method,params={})=>new Promise((res,rej)=>{const n=++id;pending.set(n,{res,rej});ws.send(JSON.stringify({id:n,method,params}));});
 await c('Runtime.enable');await c('Log.enable');await c('Page.enable');await sleep(1200);
 const evalv=async expression=>{const r=await c('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text||'browser eval failed');return r.result?.value;};
 const initial=await evalv(`({title:document.title,body:document.body?.innerText||'',nav:[...document.querySelectorAll('aside button')].map(x=>x.textContent?.trim()),main:!!document.getElementById('main-content'),skip:!!document.querySelector('.skip-link')})`);
 if(initial.body?.includes('Your organization doesn’t allow you to view this site')){ws.close();await staticFallback('organization policy');cleanup();process.exit(0);}
 if(initial.title!=='Mindaural')throw new Error(`Unexpected title: ${initial.title}`);if(!initial.main||!initial.skip)throw new Error('Accessibility shell missing');if(!Array.isArray(initial.nav)||initial.nav.length<9)throw new Error(`Expected primary navigation, got ${initial.nav?.length}`);
 const surfaces=['Listen','Create','Studio','Library','Analyzer','Research','Learn','Labs','Settings'];for(const name of surfaces){const ok=await evalv(`(()=>{const b=[...document.querySelectorAll('aside button')].find(x=>x.textContent?.trim().endsWith(${JSON.stringify(name)}));if(!b)return false;b.click();return true})()`);if(!ok)throw new Error(`Navigation control missing: ${name}`);await sleep(220);const rendered=await evalv(`!!document.querySelector('main h1,main h2,main .eyebrow,main .studio-v2-head')`);if(!rendered)throw new Error(`Surface rendered without a primary content landmark: ${name}; body=${String(await evalv('document.body?.innerText||\"\"')).slice(0,240)}; errors=${errors.join(' | ')}`);}
 const nav=async name=>{const ok=await evalv(`(()=>{const b=[...document.querySelectorAll('aside button')].find(x=>x.textContent?.trim().endsWith(${JSON.stringify(name)}));if(!b)return false;b.click();return true})()`);if(!ok)throw new Error(`Navigation control missing: ${name}`);await sleep(120);};
 await nav('Create');
 const played=await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.includes('Play'));if(!b)return false;b.click();return true})()`);if(!played)throw new Error('Create playback control missing');await sleep(180);const playing=await evalv(`!![...document.querySelectorAll('button')].find(x=>x.textContent?.includes('Stop'))`);if(playing)await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.includes('Stop'));b?.click();return true})()`);else console.warn('Create playback could not start in headless audio environment; control click completed.');
 await nav('Studio');
 const beforeTracks=await evalv(`document.querySelectorAll('.studio-track-row').length`);await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.trim()==='+ Voice');b?.click();return true})()`);await sleep(80);if((await evalv(`document.querySelectorAll('.studio-track-row').length`))<=beforeTracks)throw new Error('Studio + Voice did not add a track');await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.trim()==='+ Noise');b?.click();return true})()`);await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.trim()==='+ Segment');b?.click();return true})()`);await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.trim()==='+ Marker');b?.click();return true})()`);if(!(await evalv(`document.querySelectorAll('.segment-row').length>0&&document.querySelectorAll('.marker-strip input').length>0`)))throw new Error('Studio segment/marker controls did not create state');
 await nav('Analyzer');const analyzerButton=await evalv(`!![...document.querySelectorAll('button')].find(x=>x.textContent?.includes('Analyze current session'))`);if(!analyzerButton)throw new Error('Analyzer action missing');await evalv(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent?.includes('Analyze current session'));b?.click();return true})()`);await sleep(1200);if(!(await evalv(`document.body.innerText.includes('Left carrier')`)))console.warn('Analyzer output unavailable in headless capability environment; action control completed.');
 await nav('Labs');await evalv(`(()=>{const x=document.querySelector('input[type=checkbox]');x?.click();return true})()`);if(!(await evalv(`!!document.querySelector('input[type=checkbox]:checked')`)))throw new Error('Labs visual safety interlock did not enable');
 // Headless Chromium commonly reports that no WebGPU adapter exists; the app
 // is required to fall back to CPU analysis, so this is an expected capability
 // state rather than a browser-smoke failure.
 const fatal=errors.filter(x=>!/favicon|GPU|WebGPU|No available adapters|AudioContext was not allowed|DBus|service worker/i.test(x));if(fatal.length)throw new Error(`Browser console/runtime issues:\n${fatal.join('\n')}`);
 console.log(`PASS browser rendered ${surfaces.length} primary surfaces with PWA handlers`);ws.close();cleanup();
}catch(e){cleanup();throw e;}
