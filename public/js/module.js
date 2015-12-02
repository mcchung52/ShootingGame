'use strict';

var me = {
  name: "",
  x: 0,
  y: 0
};
var speed = 10;
var socket;

$(document).ready(init);

function init() {
  // var me = $('#player');
  // var container = $('#container');
  // var playLeft = 0;

  socket = io.connect('http://localhost:3000');
  
  $(window).keydown(function(e){move(e)});
  $('#join').click(joinClicked);
}

function joinClicked() {
  me.name = $('.username').val();
  console.log(me.name);

  socket.emit('join', me.name);
  socket.on('success', function(user) {
    console.log('data:', user);

    if (me.name === user.name) {
      me.x = user.x;
      me.y = user.y;
      //create and draw myself onto container
      var $me = $('<div>').addClass('player');
      $me.attr("id", me.name);
      $me.css("left", me.x);
      $me.css("top", me.y);
      $('#container').append($me);

      //append my name to user list
      var $p = $('<p>').text(user.name);
      $('#users').append($p);      
    }
  });
}


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

}

