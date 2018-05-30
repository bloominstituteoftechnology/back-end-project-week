const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 11;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

userSchema.pre('save', next => {
  return bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash;

      return next();
    })
    .catch(err => {
      return next(err);
    });
});

userSchema.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
