'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var http = require('http');
var server = http.Server(app);

var io = require('socket.io')(server);
//var SOCKET_PORT = process.env.SOCKET_PORT || 4000;

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ShootingGame');

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));
// app.use('/auth', require('./routes/auth'));
// app.use('/users', require('./routes/users'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404')
})

// app.listen(PORT, function(){
//   console.log('Listening on port ', PORT);
// });

server.listen(PORT);

io.on('connection', function(socket) {
  console.log('connected!');
  // socket.emit('message', {text: 'Hello there!', nums: [1,2,3]});
  socket.on('join', function(data){
    console.log(data);
    //socket.broadcast.emit('message',data);
    //pass the name to mongo
  });
});