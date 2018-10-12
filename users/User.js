const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    }
});

User.pre('save', function(next) {
    return bcrypt
      .hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        return next();
      })
      .catch(err => {
        return next(err);
      });
});

User.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};
  
module.exports = mongoose.model('User', User);