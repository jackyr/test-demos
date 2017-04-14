console.log('worker init');
importScripts('common.js');
self.onmessage = function (event) {
  console.log("worker onmessage:", event.data);

  var now = Date.now();
  while (Date.now() - now <= 2000) {}
  
  self.postMessage(event.data + ' ' + name);
  close();
};
