onmessage = function (event) {
  console.log(2, event);
  var data = event.data;
  postMessage(data);
}
