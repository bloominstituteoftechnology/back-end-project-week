const mongoose = require('mongoose');

const Note = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
  },
  stamp: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  }
});

module.exports = mongoose.model('Note', Note);
