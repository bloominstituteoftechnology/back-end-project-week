const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
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

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hashed) => {
    if (err) return next(err);
    this.password - hashed;
    next();
  });
});

UserSchema.methods.checkPassword = function(pwPlain, cb) {
  bcrypt.compare(pwPlain, this.password, (err, pwMatch) => {
    if (err) return cb(err);
    cb(null, pwMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
