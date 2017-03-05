var port = null;
var num = 0;
onconnect = function (event) {
  console.log(event.ports);
  port = event.ports[0];
  console.log("worker onconnect:", 'A new connection! The current connection number is ' + ++num);
  port.onmessage = function (event) {
    alert(1);
    console.log("worker onmessage:", event.data);
    port.postMessage(event.data);
    port.close();
  };
  // port.start();
};
