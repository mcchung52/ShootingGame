'use strict';

var me = {
  name: "",
  x: 0,
  y: 0,
  loginAt: 0
};

var joinState = 1, loginState = 2, postLogin = 3;
var state = joinState;
var speed = 10;
var socket = io.connect('http://localhost:3000');


$(document).ready(init);

function init() {
  // var me = $('#player');
  // var container = $('#container');
  // var playLeft = 0;
  $('#logout').hide(true); 
  $(window).keydown(function(e){move(e)});
  $('#login').click(loginClicked);
  $('#logout').click(logoutClicked);

  socket.emit('join', "");
  socket.on('joinUpdate', function(users) {
    var $players = $('<div>');
    var $userlist = $('<div>');
    for (var i=0;i<users.length;i++) {
      //create and draw player onto container
      var $player = $('<div>').addClass('player');
      $player.attr("id", users[i].name);
      $player.text(users[i].name);
      $player.css("left", users[i].x);
      $player.css("top", users[i].y);
      $players.append($player);
      
      var $p = $('<p>').text(users[i].name);
      $userlist.append($p);
    }
    $('#container').append($players);
    //var $p = $('<p>').text(user.name);
    var $h4 = $('<h4>').text('users');
    $('#users').empty().append($h4, $userlist);
  });
}

function logoutClicked() {
  socket.emit('logout', me.name);
  state = joinState;
  $('#login').show(true); 
  $('#logout').hide(true); 
}

function loginClicked() {
  me.name = $('.username').val();
  $('.username').prop('disabled',true);

  socket.emit('login', me.name);
  state = loginState;
  $('#login').hide(true); 
  $('#logout').show(true); 
}


socket.on('loginSuccess', function(users) { //error might get passed in here
  var $players = $('<div>');
  var $userlist = $('<div>');

  if (state === loginState) {
    $('#container').empty();
    for (var i=0;i<users.length;i++) {
      if (me.name === users[i].name) {
        me.x = users[i].x;
        me.y = users[i].y;
        me.loginAt = users[i].loginAt;
      }
      //create and draw player onto container
      var $player = $('<div>').addClass('player');
      $player.attr("id", users[i].name);
      $player.text(users[i].name);
      $player.css("left", users[i].x);
      $player.css("top", users[i].y);
      $players.append($player);
      
      var $p = $('<p>').text(users[i].name);
      $userlist.append($p);
    }
    state = postLogin;

  } else if (state === postLogin || state === joinState) {
      // if (users[i].loginAt >= me.loginAt && users[i].name !== me.name) {
        //create and draw player onto container
      var newUser = users.length - 1;
      var $player = $('<div>').addClass('player');
      $player.attr("id", users[newUser].name);
      $player.text(users[newUser].name);
      $player.css("left", users[newUser].x);
      $player.css("top", users[newUser].y);
      $players.append($player);
      //}
      var $p;
      for (var i=0;i<users.length;i++) {
        $p = $('<p>').text(users[i].name);
        $userlist.append($p);
      }
  }

  $('#container').append($players);
  //var $p = $('<p>').text(user.name);
  var $h4 = $('<h4>').text('users');
  $('#users').empty().append($h4, $userlist);


});

socket.on('moveUpdate', function(user){
  if (state === joinState || me.name !== user.name) {
    $('#' + user.name).css("left", user.x); //factor this out later
    $('#' + user.name).css("top", user.y);
  }
});


function move(e) {
  if(me.name != "") {
    if(e.keyCode === 39) {
      me.x += speed;
      $('#' + me.name).css("left", me.x);
      socket.emit('move', me);
    }
    else if(e.keyCode === 37) {
      me.x -= speed;
      $('#' + me.name).css("left", me.x);
      socket.emit('move', me);
    }
    else if(e.keyCode === 38) {
      me.y -= speed;
      $('#' + me.name).css("top", me.y);
      socket.emit('move', me);
    }
    else if(e.keyCode === 40) {
      me.y += speed;
      $('#' + me.name).css("top", me.y);
      socket.emit('move', me);
    }    
  }
  //send to server my coordinate and
  //get back whether 
  //socket.emit('move', me);
}
