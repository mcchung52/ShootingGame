'use strict';

var me = {
  name: "",
  x: 0,
  y: 0
};
var speed = 10;
var socket = io.connect('http://localhost:3000');

$(document).ready(init);

function init() {
  // var me = $('#player');
  // var container = $('#container');
  // var playLeft = 0;

  // socket = io.connect('http://localhost:3000');
  
  $(window).keydown(function(e){move(e)});
  $('#join').click(joinClicked);
}

function joinClicked() {
  me.name = $('.username').val();
  console.log(me.name);

  socket.emit('join', me.name);
}


socket.on('joinSuccess', function(user) {
  if (me.name === user.name) {
    me.x = user.x;
    me.y = user.y;
  }
  //create and draw player onto container
  var $player = $('<div>').addClass('player');
  $player.attr("id", user.name);
  $player.text(user.name);
  $player.css("left", user.x);
  $player.css("top", user.y);
  // $player.text(user.name);
  $('#container').append($player);

  //append my name to user list
  var $p = $('<p>').text(user.name);
  $('#users').append($p);  
});

socket.on('moveUpdate', function(user){
  console.log('here');
  if (me.name !== user.name) {
    $('#' + user.name).css("left", user.x); //factor this out later
    $('#' + user.name).css("top", user.y);
  }
});


function move(e) {
  if(e.keyCode === 39) {
    me.x += speed;
    $('#' + me.name).css("left", me.x);
  }
  else if(e.keyCode === 37) {
    me.x -= speed;
    $('#' + me.name).css("left", me.x);
  }
  else if(e.keyCode === 38) {
    me.y -= speed;
    $('#' + me.name).css("top", me.y);
  }
  else if(e.keyCode === 40) {
    me.y += speed;
    $('#' + me.name).css("top", me.y);
  }
  //send to server my coordinate and
  //get back whether 
  socket.emit('move', me);
}

