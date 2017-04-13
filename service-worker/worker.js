const CACHE_LIST = [
  'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
  //'/test-demos/service-worker/',
  '/test-demos/service-worker/offline.html',
  '/test-demos/service-worker/img/1.jpeg',
];

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
          console.log('#########');
          if (CACHE_LIST.find(item => event.request.url.endWith(item))) {
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
      return caches.match('/test-demos/service-worker/offline.html');
    })
  );
});
