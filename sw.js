// ★重要: index.htmlを更新したときは、ここの数字(v19 -> v20)を必ず変えてください。
// そうしないと、古い画面が残り続けてしまいます。
const CACHE_NAME = 'simple-calc-app-v21'; 

const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'favicon-96x96.png',
  'apple-touch-icon.png',
  'web-app-manifest-192x192.png',
  'web-app-manifest-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});
