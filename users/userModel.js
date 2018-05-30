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
  cohort: {
    type: String,
    required: true,
    maxlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdOn: {
    date: Date
  }
});

module.exports = mongoose.model('User', userModel);
