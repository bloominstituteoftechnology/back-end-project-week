import { model } from 'mongoose';

const mongoose = require('mongoose');

const userSchema = new mongoose({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
