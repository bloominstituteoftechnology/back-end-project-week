const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function(passwordGuess, cb) {
  // example using callback instead of promises
  bcrypt.compare(passwordGuess, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', User);