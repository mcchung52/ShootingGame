'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User; 

var userSchema = Schema({
  name: { type: String, required: true },
  x: { type: Number },
  y: { type: Number },
  image: { type: String },
  loginAt: { type: Date, default: Date.now }
});

var images = 
[ 
  "http://freebreaksblog.com/wp-content/uploads/2013/07/Mario.jpg",
  "http://elvortex.com/wp-content/uploads/2013/07/Paper_luigi.jpg",
  "http://annawrites.com/blog/wp-content/uploads/2012/02/family-guy.jpg",
  "http://cdn.designrfix.com/wp-content/uploads/2009/09/character-illustration-tutorials-8.jpg",
  "http://blog.spoongraphics.co.uk/wp-content/uploads/2011/mushroom-character/mushroom-character.jpg"
  // "",
  // "",
  // "",
  // "",
];

userSchema.statics.add = function (user, cb){
  User.findOne({name: user.name}, function(err, dbUser){
    if (err || dbUser) return cb(err || 'Username taken already.');
    
    var newUser = new User();
    newUser.name = user.name;
    newUser.x = user.x;
    newUser.y = user.y;
    newUser.image = images[Math.floor(Math.random() * images.length)];
    newUser.save(function(err, savedUser){
      if (err) return (cb(err));
      cb(savedUser);
    });
  })
}

userSchema.statics.update = function(user, cb) {
  User.findOne({name: user.name}, function(err, dbUser) {
    if (err || !dbUser) return cb(err || 'whats happening here');

    dbUser.x = user.x;
    dbUser.y = user.y;
    dbUser.save(function(err, savedUser){
      if (err) return (cb(err));
      cb(savedUser);
    });
  })
}

User = mongoose.model('User', userSchema);

module.exports = User;