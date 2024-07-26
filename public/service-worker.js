const staticCacheName = "cache-v5";

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((keys) => {
          return Promise.all(
              keys.filter((key) => key !== staticCacheName)
                  .map((key) => caches.delete(key))
          );
      }).then(() => {
          return self.clients.claim();
      })
  );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(staticCacheName).then((cache) => {
                    cache.put(event.request, responseClone);
                });
            }
            return response;
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});
