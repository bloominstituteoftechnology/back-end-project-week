/* eslint func-names: [0] */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 11;

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function (rawPassword, cb) {
  bcrypt.compare(rawPassword, this.password, cb);
};

module.exports = mongoose.model('User', User);
