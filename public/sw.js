const CACHE_NAME = 'hellinmarket-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through simple para evitar problemas de caché agresiva en dev
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
