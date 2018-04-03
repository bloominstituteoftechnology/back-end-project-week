const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();
const BCRYPT_COST = parseInt(process.env.SALT_ROUNDS);

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/users');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function a(next) {
  bcrypt.hash(this.password, BCRYPT_COST, (error, hash) => {
    if (error) return next(error);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
