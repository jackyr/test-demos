const ROOT_URL = '/test-demos/service-worker/';
const CACHE_LIST = [
  ...[
    'offline.html',
    'img/1.jpeg'
  ].map(item => ROOT_URL + item),
  'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
];
console.log(CACHE_LIST);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(CACHE_LIST);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches
    .match(event.request)
    .then(response => {
      console.log(1, response);
      return (response || fetch(event.request)
        .then(fetchResponse => {
          if (CACHE_LIST.find(item => event.request.url.endsWith(item))) {
            caches.open('v1').then(cache => {
              cache.put(event.request, fetchResponse);
            });
          }
          console.log(fetchResponse);
          return fetchResponse;
        })
      );
    })
    .catch(() => {
      console.log(2);
      if (event.request.url.endsWith(ROOT_URL)) {
        return caches.match(ROOT_URL + 'offline.html');
      }
    })
  );
});
