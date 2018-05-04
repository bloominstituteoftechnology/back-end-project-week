const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 11;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);