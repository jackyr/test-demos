const ROOT_URL = '/test-demos/service-worker/';
const CACHE_NAME = 'V1';
const CACHE_LIST = [
  'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
  ...[
    'offline.html',
    'img/1.jpeg'
  ].map(item => ROOT_URL + item),
];

self.addEventListener('install', function(event) {
  /*event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_LIST);
    })
  );*/
});

self.addEventListener('fetch', function(event) {
  const requestUrl = event.request.url;
  console.log('fetch event occurred: ' + requestUrl);
  event.respondWith(
    caches
    .match(event.request)
    .then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        if (CACHE_LIST.find(item => requestUrl.endsWith(item))) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse)
            .then(() => console.log('response cached: ' + requestUrl));
          });
        }
        return fetchResponse.clone();
      });
    })
    .catch(() => {
      if (requestUrl.endsWith(ROOT_URL)) {
        return caches.match(ROOT_URL + 'offline.html');
      }
      if (requestUrl.endsWith('hVsghLyuoDyZovLGhSxl.json')) {
        const res = JSON.stringify({status: 'success', data: '我是离线指定的返回值'});
        return new Response(res, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          }
        });
      }
    })
  );
});
