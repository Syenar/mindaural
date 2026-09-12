const CACHE='bbs-v4-labs-editor';
const SHELL=['./','./index.html','./styles.css','./app.webmanifest','./vendor/react.production.min.js','./vendor/react-dom.production.min.js','./src/main.js','./public/offline.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bbs-')&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method==='POST'&&u.searchParams.get('share')==='1'){
    e.respondWith((async()=>{
      const form=await e.request.formData(),files=form.getAll('files').filter(v=>v instanceof File),token=crypto.randomUUID(),cache=await caches.open(CACHE);
      let n=0;
      for(const f of files){const key=new URL(`./__share_inbox__/${token}/${n}`,self.registration.scope).href;await cache.put(key,new Response(f,{headers:{'content-type':f.type||'application/octet-stream','x-bbs-filename':encodeURIComponent(f.name)}}));n++;}
      const target=new URL('./',self.registration.scope);target.searchParams.set('share_token',token);target.searchParams.set('share_count',String(n));
      return Response.redirect(target.href,303);
    })());return;
  }
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{if(r.ok&&u.origin===self.location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>e.request.mode==='navigate'?caches.match('./public/offline.html'):Response.error())));
});
