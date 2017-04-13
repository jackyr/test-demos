self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
        //'/test-demos/service-worker/',
        '/test-demos/service-worker/img/1.jpeg',
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
      console.log(2, res);
      response = res;
      caches.open('v1').then(cache => {
        cache.put(event.request, response);
      });
      return response.clone();
    })
    .catch(() => {
      console.log(3);
      return new Response('我是兜底的响应', {status: 200});
    })
  );
  // event.respondWith(
    // caches.match(event.request);
  // );
});
