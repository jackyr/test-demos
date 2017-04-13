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

/*self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_LIST);
    })
  );
});*/

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  const requestUrl = event.request.url;
  console.log('Fetch event occurred: ' + requestUrl);
  event.respondWith(
    caches
    .match(event.request)
    .then(response => {
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
      else if (requestUrl.endsWith('hVsghLyuoDyZovLGhSxl.json')) {
        const res = JSON.stringify({status: 'success', data: '我是离线指定的返回值'});
        return new Response(res, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      else if (requestUrl.endsWith('baibaihe.jpeg')) {
        console.log('#########');
        const res = fetch('https://zos.alipayobjects.com/rmsportal/zgpxTwqAeEFjSLFPmAWQ.jpg');
        return new Response(res, {
          status: 200,
        });
      }
      else {
        return new Response('Resource fetch failed', {
          status: 404,
        })
      }
    })
  );
});
