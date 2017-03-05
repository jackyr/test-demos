var port = null;
var num = 0;
onconnect = function (event) {
  port = event.ports[0];
  port.postMessage('A new connection! The current connection number is ' + ++num);

  port.onmessage = function (event) {
    //alert(1);
    console.log("worker onmessage:", event.data);
    port.postMessage(event.data);
    port.close();
  };
  // port.start();
};
