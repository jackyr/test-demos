onmessage = function (event) {
  console.log(2, event);
  var now = Date.now();
  while (Date.now() - now <= 3000) {}
  postMessage(event.data);
};
