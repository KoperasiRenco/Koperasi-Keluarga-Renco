var CACHE_NAME = 'renco-v2';

self.addEventListener('install', function(e) {
  console.log('[SW] Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  console.log('[SW] Activating...');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(e.request).then(function(response) {
        cache.put(e.request, response.clone());
        return response;
      }).catch(function() {
        return caches.match(e.request);
      });
    })
  );
});
