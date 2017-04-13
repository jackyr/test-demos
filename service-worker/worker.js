self.addEventListener('install', function(event) {
  console.log(123);
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
        '/service-worker/img/',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event, caches);
  event.respondWith(
    caches
    .match(event.request)
    .catch(() => {
      console.log(1);
      return fetch(event.request);
    })
    .then(res => {
      console.log(2);
      response = res;
      caches.open('v1').then(cache => {
        cache.put(event.request, response);
      });
      return response.clone();
    }).catch(() => {
      return caches.match('/sw-test/gallery/myLittleVader.jpg');
    })
  );
  // event.respondWith(
    // caches.match(event.request);
  // );
});
