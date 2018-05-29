const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 13
  },
  FirstName: {
    type: String,
    required: true,
    maxlength: 13
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 13
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    date: Date
  }
});

module.exports = userModel.model('User', User);
