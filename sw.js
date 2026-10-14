// オフラインで動かすためのファイル。最初に開いたときに全部を端末へ保存します。
// 内容を更新したときは、下の数字を1つ上げてください。
var VER='eitango-v2';
var FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','xlsx.full.min.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(VER).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VER}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(res){
      if(res&&res.ok&&new URL(e.request.url).origin===location.origin){var cp=res.clone();caches.open(VER).then(function(c){c.put(e.request,cp)})}
      return res;
    }).catch(function(){return hit||caches.match('index.html')});
    return hit||net;
  }));
});
