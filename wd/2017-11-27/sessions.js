var http = require('http');
var uuid = require('uuid/v4');
var debug = require('debug')('xxx');
var session = {};
http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var cookie = req.headers['cookie'];
    var user;
    var sid;
    if (cookie) {
      debug('log' + 'already have cookie');
      var cookies = cookie.split('; ');
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf('sid') === 0) {
          sid = cookies[i].split('=')[1];
          user = session[sid];
          debug('log' + sid);
          break;
        }
      }
    }
    if (!user) {
      debug('log' + 'have no cookie');
      user = {
        id: uuid(),
        username: 'user-' + new Date().getTime(),
        password: 'passord'
      };
      sid = uuid();
      debug('log' + sid);
      debug('log' + user.id);
      session[sid] = user;
      res.writeHead(200, {
        'Set-Cookie': 'sid=' + sid,
        'Content-Type': 'text/plains'
      });
    }
    res.write('your name is ' + user.username);
    res.end();
  }
}).listen(8080);
