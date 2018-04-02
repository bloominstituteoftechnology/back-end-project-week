const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const BCRYPT_COST = 11;

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    required: true,
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
