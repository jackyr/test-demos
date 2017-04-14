const ROOT_URL = '/test-demos/service-worker/';
const CACHE_NAME = 'V1';
const CACHE_LIST = [
  'https://os.alipayobjects.com/rmsportal/hVsghLyuoDyZovLGhSxl.json',
  //ROOT_URL + 'index.html',
  ...[
    'offline.html',
    'img/baibaihe.jpeg',
  ].map(v => ROOT_URL + v),
];

self.addEventListener('install', function(event) {
  //self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_LIST);
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
    .keys()
    .then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
    .then(() => console.log('Service worker is now ready to handle fetches!'))
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
        if (!fetchResponse || fetchResponse.status !== 200) {
          return failureDowngrade(requestUrl);
        }
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
      return failureDowngrade(requestUrl);
    })
  );
});

function failureDowngrade(requestUrl) {
  if (requestUrl.endsWith('index.html')) {
    return caches.match(ROOT_URL + 'offline.html');
  } 
  else if (requestUrl.endsWith('hVsghLyuoDyZovLGhSxl.json')) {
    const res = JSON.stringify({status: 'success', data: '我是请求出错时指定的返回值'});
    return new Response(res, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  else if (requestUrl.endsWith('baibaihe.jpeg')) {
    return fetch('https://zos.alipayobjects.com/rmsportal/zgpxTwqAeEFjSLFPmAWQ.jpg');
  }
  else {
    return new Response('Resource fetch failed', {
      status: 404,
    })
  }
}
