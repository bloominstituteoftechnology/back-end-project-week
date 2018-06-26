// from Authentication sprint challenge
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');

const SALT_ROUNDS = 11;

User.pre('save', function(next) {
  return bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash
      return next()
    })
    .catch(err => {
      return next(err)
    })
});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
  return bcrypt.compare(plainTextPW, this.password, (err, res) => {
    return callBack(err, res);
  });
};

module.exports = mongoose.model('User', UserSchema);