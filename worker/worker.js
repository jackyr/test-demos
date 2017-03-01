// console.log('worker init');
onmessage = function (event) {
  console.log("worker onmessage:", event.data);
  alert(1)
  var now = Date.now();
  while (Date.now() - now <= 2000) {}
  
  postMessage(event.data);
};
