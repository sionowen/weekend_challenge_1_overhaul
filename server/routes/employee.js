var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function (err, result) {
      done();



      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    console.log(req.body);
    client.query('SELECT * FROM employees', function (err, result) {
      done();



    });
  });
});





module.exports = router;
