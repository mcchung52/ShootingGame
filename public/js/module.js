'use strict';

var player = {
  x: 0,
  y: 0
};
var speed = 10;
var socket;

$(document).ready(init);

function init() {
  var player = $('#player');
  var container = $('#container');
  var playLeft = 0;

  socket = io.connect('http://localhost:3000');
  
  $(window).keydown(function(e){move(e)});
  $('#join').click(joinClicked);
}

function joinClicked() {
  var username = $('.username').val();
  console.log(username);
  socket.emit('join', username);
  // socket.on('message', function(data) {
  //   console.log('data:', data);
  // })
}

function move(e) {
  if(e.keyCode === 39) {
    player.x += speed;
    $('#player').css("left",player.x);
  }
  else if(e.keyCode === 37) {
    player.x -= speed;
    $('#player').css("left",player.x);
  }
  else if(e.keyCode === 38) {
    player.y -= speed;
    $('#player').css("top",player.y);
  }
  else if(e.keyCode === 40) {
    player.y += speed;
    $('#player').css("top",player.y);
  }
}

