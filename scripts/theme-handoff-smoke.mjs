import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';

const port=9239,chrome=[`${process.env.PROGRAMFILES||'C:/Program Files'}\\Google\\Chrome\\Application\\chrome.exe`,`${process.env['PROGRAMFILES(X86)']||'C:/Program Files (x86)'}\\Google\\Chrome\\Application\\chrome.exe`].find(existsSync);
if(!chrome)throw new Error('Chrome was not found for the theme handoff smoke test.');
const child=spawn(chrome,['--headless=new','--no-sandbox','--force-dark-mode',`--remote-debugging-port=${port}`,`--user-data-dir=${process.env.TEMP||'C:/Windows/Temp'}\\mindaural-theme-${process.pid}`,'http://127.0.0.1:4173/index.html'],{stdio:'ignore'});
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
  let tab;for(let i=0;i<60;i++){try{const tabs=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();tab=tabs.find(x=>x.type==='page');if(tab)break}catch{}await wait(100)}
  if(!tab)throw new Error('Chrome DevTools did not become ready.');
  const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});let id=0;const pending=new Map();ws.onmessage=event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result)}};
  const evaluate=expression=>new Promise((resolve,reject)=>{const request=++id;pending.set(request,{resolve,reject});ws.send(JSON.stringify({id:request,method:'Runtime.evaluate',params:{expression,returnByValue:true,awaitPromise:true}}))}).then(result=>result.result?.value);
  await evaluate(`localStorage.setItem('bbs.theme','system');location.reload();true`);await wait(400);
  const href=await evaluate(`document.querySelector('a[href*="demo.html"]')?.href`);
  const landing=await evaluate(`getComputedStyle(document.body).backgroundColor`);
  if(!href?.includes('theme=system'))throw new Error(`Landing did not propagate system theme: ${href}`);
  if(landing!=='rgb(17, 19, 24)')throw new Error(`Landing System theme is ${landing}, expected the dark system background.`);
  await evaluate(`location.href=${JSON.stringify(href)};true`);await wait(900);
  const result=await evaluate(`({theme:document.documentElement.dataset.theme,header:getComputedStyle(document.querySelector('header')).backgroundColor})`);
  if(result.theme!=='system')throw new Error(`Demo applied ${result.theme}, expected system.`);
  if(result.header!=='color(srgb 0.105882 0.117647 0.141176 / 0.94)')throw new Error(`Demo header color ${result.header} is not the dark system surface.`);
  console.log(`PASS dark-System landing-to-demo handoff: landing ${landing}, demo header ${result.header}`);ws.close();
}finally{child.kill('SIGKILL')}
