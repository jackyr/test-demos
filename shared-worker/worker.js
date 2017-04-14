var portSet = [];
var numSet = [];
self.onconnect = event => {
  var port = event.ports[0];
  portSet.push(port);
  numSet.push(0);
  console.log('New connection!');
  
  port.onmessage = event => {
    var data = event.data;
    var portIndex = portSet.indexOf(event.target);
    if (data === 'close') {
      portSet.splice(portIndex, 1);
      numSet.splice(portIndex, 1);
    } else {
      numSet[portIndex] = Number(data);
    }
    portSet.forEach(port => {
      port.postMessage(getResult(numSet));
    });
  };
  // port.start();

  function getResult(set) {
    return set.length > 1 ? `${set.join(' + ')} = ${set.reduce((prev, curr) => prev + curr)}` : set[0];
  }
};
