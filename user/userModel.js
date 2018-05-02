const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

User.pre('save', function(next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function(passwordGuess, cb) {
  return bcrypt.compare(passwordGuess, this.password, function(err, isValid) {
    if (err) return cb(err);
    cb(null, isValid);
  });
};

module.exports = mongoose.model('User', User);
