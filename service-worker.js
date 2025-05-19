const CACHE_NAME = 'pwa-cache-v1';
const FILES_TO_CACHE = [
  '/Sprint-C3-Lab-1/',
  '/Sprint-C3-Lab-1/index.html',
  '/Sprint-C3-Lab-1/styles.css',
  '/Sprint-C3-Lab-1/script.js',
  '/Sprint-C3-Lab-1/manifest.json',
  '/Sprint-C3-Lab-1/icon-192x192.png'
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching files');
      return cache.addAll(FILES_TO_CACHE);
    }).catch((err) => {
      console.error('[Service Worker] Failed to cache:', err);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Handle root URL fallback for offline visits
        if (event.request.mode === 'navigate') {
          return caches.match('/Sprint-C3-Lab-1/index.html');
        }
      });
    })
  );
});

