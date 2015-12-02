'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User; 

var userSchema = Schema({
  name: { type: String, required: true },
  x: { type: Number },
  y: { type: Number }
});

userSchema.statics.add = function (user, cb){
  User.findOne({name: user.name}, function(err, dbUser){
    if (err || dbUser) return cb(err || 'Username taken already.');
    
    var newUser = new User();
    newUser.name = user.name;
    newUser.x = user.x;
    newUser.y = user.y;
    newUser.save(function(err, savedUser){
      if (err) return (cb(err))
      cb(savedUser);
    });
  })
}

User = mongoose.model('User', userSchema);

module.exports = User;