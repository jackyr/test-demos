const ROOT_URL = '/test-demos/service-worker/';
const CACHE_NAME = 'V1';
const CACHE_LIST = [
  'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
  //ROOT_URL,
  ...[
    'offline.html',
    'img/baibaihe.jpeg',
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
  console.log('Fetch event occurred: ' + requestUrl);
  event.respondWith(
    caches
    .match(event.request)
    .then(response => {
      console.log(response.body);
      if (response) {
        return response;
      }
      return fetch(event.request).then(fetchResponse => {
        if (CACHE_LIST.find(item => requestUrl.endsWith(item))) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse)
            .then(() => console.log('Response cached: ' + requestUrl));
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
          },
        });
      }
      if (requestUrl.endsWith(ROOT_URL + 'baibaihe.jpeg')) {
        return new Response('http://img4.imgtn.bdimg.com/it/u=1007043693,2735869963&fm=23&gp=0.jpg', {
          status: 200,
        })
      }
    })
  );
});
