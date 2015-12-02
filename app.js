'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var User = require('./models/user');

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
//app.use('/', require('./routes/index'));
// app.use('/auth', require('./routes/auth'));
// app.use('/users', require('./routes/users'));
app.get('/', function(req, res) {
  

  res.render('index');
  // res.render('index', {users: users});
  // res.sendFile(__dirname + '../views/index.html');
});

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
  socket.on('join', function(joinedUser){

    //generate coordinate and make the User object
    var user = {};
    user.name = joinedUser;
    user.x = Math.floor(Math.random() * 550);
    user.y = Math.floor(Math.random() * 350);
    User.add(user, function(data){
      //handle error
      console.log('user add', data);
      User.find({}, function(err, allUsers){
        //if (err) 
          io.emit('joinSuccess', err || allUsers);
      });
      //io.emit('joinSuccess', user); //error might get passed in here
    });
  });

  socket.on('move', function(user) {
    User.update(user, function(updatedUser){
      //handle error
      console.log('name:',updatedUser.name);
      console.log('x:', updatedUser.x);
      console.log('y:', updatedUser.y);
      io.emit('moveUpdate', updatedUser);      
    });
  });

  socket.on('disconnect', function(user){
    
  });
});



