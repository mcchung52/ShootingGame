'use strict';

var express = require('express');
var router = express.Router();

// INDEX

router.get('/', function(req, res) {
  res.render('index');
  // res.sendFile(__dirname + '../views/index.html');
});

module.exports = router;
