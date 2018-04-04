const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  hashpassword: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.hashpassword, SALT_ROUNDS, (err, password) => {
    if (err) return next(err);
    this.hashpassword = password;
    next();
  });
});

UserSchema.methods.checkPassword = function(plainTextPW, cb) {
  bcrypt.compare(
    plainTextPW,
    this.hashpassword,
    (err, matchingPassword) => {
      if (err) return cb(err);
      cb(null, matchingPassword);
    }
  );
};

module.exports = mongoose.model('User', UserSchema);