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
    
  $(window).keydown(function(e){move(e)});
  $('#join').click(joinClicked);
}

function joinClicked() {
  me.name = $('.username').val();
  console.log(me.name);

  socket.emit('join', me.name);
}


socket.on('joinSuccess', function(users) { //error might get passed in here
    console.log('users', users);
    var $players = $('<div>');
    var $userlist = $('<div>');
    for (var i=0;i<users.length;i++) {
      if (me.name === users[i].name) {
        me.x = users[i].x;
        me.y = users[i].y;
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

    $('#container').append($players);

    //var $p = $('<p>').text(user.name);
    $('#users').append($userlist);  
});

socket.on('moveUpdate', function(user){
  if (me.name !== user.name) {
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

