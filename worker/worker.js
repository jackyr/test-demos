onmessage = function (event) {
  alert(1);
  console.log("worker onmessage:", event.data);
  
  var now = Date.now();
  while (Date.now() - now <= 2000) {}
  
  postMessage(event.data);
};
