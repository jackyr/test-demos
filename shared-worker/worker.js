var i = 0;
var portSet = [];
var numSet = [];
onconnect = event => {
  var port = event.ports[0];
  portSet.push(port);
  numSet.push(0);
  console.log("worker onconnect:", 'A new connection! The current connection number is ' + ++i);
  
  port.onmessage = (i => event => {
    var data = event.data;
    numSet[i-1] = data - 0;
    portSet.forEach(port => {
      port.postMessage(getResult(numSet));
    });
  })(i);
  // port.start();

  function getResult(set) {
    return set.length > 1 ? `${set.join(' + ')} = ${set.reduce((prev, curr) => prev + curr)}` : set[0];
  }
};
