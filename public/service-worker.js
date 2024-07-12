const staticCacheName = "cache-v3";

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      // On success, update the cache and return the response
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(staticCacheName).then((cache) => {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      // If fetch fails, try to retrieve from cache
      return caches.match(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
