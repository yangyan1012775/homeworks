var express = require('express');
var router = express.Router();
var base = require('./base');

router.post('/register', function(req, res) {
  var email = req.body.email;
  var name = email;
  var pwd = req.body.pwd;
  base(function(con) {
    var have = 'select *from user where username =\'' + name + '\';';
    con.query(have, function(err, result) {
      if (result.length === 0 && email !== '' && pwd !== '') {
        var sql = 'INSERT INTO user (username,password) VALUES(\'' + name + '\',\'' + pwd + '\');';
        var sql2 = 'INSERT INTO mailbox (address) VALUES(\'' + email + '\');';
        con.query(sql, function(err) {
          if (err) {
            throw err;
          }
          res.render('login');
        });
        con.query(sql2, function(err) {
          if (err) {
            throw err;
          }
        });
      } else {
        res.render('register');
      }
    });
  }, 'emailSystem');
});
