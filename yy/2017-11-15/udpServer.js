const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var debug = require('debug')('xxx');
server.on('message', (message, rinfo) => {
  debug('log:' + 'server got: ${message} from ${rinfo.address}:${rifo.port}');
  debug('log:' + rinfo);
});
server.bind(4333);
