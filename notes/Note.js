const mongoose = require('mongoose');

const Note = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('Note', Note);