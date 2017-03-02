// console.log('worker init');
var messageHandler = function (event) {
  console.log("worker onmessage:", event.data);

  var now = Date.now();
  while (Date.now() - now <= 2000) {}
  
  postMessage(event.data);
  self.close();
};

self.addEventListener('message', messageHandler);
