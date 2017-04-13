const ROOT_URL = '/test-demos/service-worker/';
const CACHE_LIST = [
  'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
  ...[
    'offline.html',
    'img/1.jpeg'
  ].map(item => ROOT_URL + item),
];

self.addEventListener('install', function(event) {
  /*event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(CACHE_LIST);
    })
  );*/
});

self.addEventListener('fetch', function(event) {
  console.log('fetch event occurred: ' + event.request.url);
  event.respondWith(
    caches
    .match(event.request)
    .then(response => {
      return (response || fetch(event.request)
        .then(fetchResponse => {
          if (CACHE_LIST.find(item => event.request.url.endsWith(item))) {
            caches.open('v1').then(cache => {
              cache.put(event.request, fetchResponse);
            });
          }
          return fetchResponse.clone();
        })
      );
    })
    .catch(() => {
      if (event.request.url.endsWith(ROOT_URL)) {
        return caches.match(ROOT_URL + 'offline.html');
      }
    })
  );
});
