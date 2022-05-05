 
let cacheName="shkjhome";
//获取新的版后，并进行校验
self.addEventListener('activate', function(e) {
    //   e.waitUntil(
            // caches.keys().then(function(keyList) {
                //   return Promise.all(keyList.map(function(key) {
                //         fetch('version.js').then(res=>res.text()).then(data=>{
                //               cacheName
                //         })
                //         if(key.indexOf("shtg")!==-1&&key !== cacheName) {
                //             return caches.delete(key);
                //         }
                //   }));
            // })
    //   );
});  
//监听所有的http，进行缓存控制
self.addEventListener('fetch', function(e) {
    if(
        e.request.url.indexOf('version.js')!==-1||
        e.request.url.indexOf('cdn.jsdelivr')!==-1||
        e.request.url.indexOf('cdn.bootcdn')!==-1
    ){
        return
    }
    if(e.request.url.match(/\.js$|\.css$|\.html$|\.png$|\.jpg$|\.jpeg$|\.svg$|\.woff$/)===null){
        return
    }
    e.respondWith(
      caches.match(e.request).then(function(r) {
        return r || fetch(e.request).then(function(response) {
                  return caches.open(cacheName).then(function(cache) {
                      if(e.request.url.match(/\.js$|\.css$|\.html$|\.png$|\.jpg$|\.jpeg$|\.svg$|\.woff$|\.json$/)!==null){
                            cache.put(e.request, response.clone());
                      }
              return response;
          });
        });
      })
    );
});