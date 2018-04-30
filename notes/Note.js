const mongoose = require('mongoose');

const Note = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Note', Note);