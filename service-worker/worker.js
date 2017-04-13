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
  //if (CACHE_LIST.find(item => event.request.url.endWith(item))) {
    event.respondWith(
      caches
      .match(event.request)
      .catch(() => {
        console.log(1);
        return fetch(event.request);
      })
      .then(response => {
        console.log(2, response);
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
        return caches.match('/test-demos/service-worker/offline.html');
      })
    );
    // event.respondWith(
      // caches.match(event.request);
    // );
  //}
});
