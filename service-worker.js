const CACHE_NAME = 'task-assistant-v1';
const urlsToCache = [
  '/', 
  '/index.html',
  '/manifest.json',
  '/icon.png' // 確保您的圖標和網站主文件被快取
];

// 安裝 Service Worker 並快取必要資產
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，嘗試從快取中獲取資源
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 快取中有資源則直接回傳
        if (response) {
          return response;
        }
        // 快取中沒有則從網路獲取
        return fetch(event.request);
      })
  );
});

// 啟用新的 Service Worker 並清理舊的快取
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // 刪除舊快取
          }
        })
      );
    })
  );
});