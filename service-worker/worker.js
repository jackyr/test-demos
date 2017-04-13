self.addEventListener('install', function(event) {
  /*event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
        //'/test-demos/service-worker/',
        '/test-demos/service-worker/img/1.jpeg',
      ]);
    })
  );*/
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches
    .match(event.request)
    .catch(() => {
      console.log(1);
      return fetch(event.request);
    })
    .then(response => {
      console.log(2， response);
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then(fetchResponse => {
          //caches.open('v1').then(cache => {
            //cache.put(event.request, response);
          //});
          return fetchResponse;
        });      
    })
    .catch(() => {
      console.log(3);
      return new Response('11111', {status: 200, contentType: ''});
    })
  );
  // event.respondWith(
    // caches.match(event.request);
  // );
});
