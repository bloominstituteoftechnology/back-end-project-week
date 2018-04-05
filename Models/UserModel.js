const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT = 11;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT, (err, hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
