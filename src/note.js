const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    default: 'New Note',
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  tags: String
});

module.exports = mongoose.model('Note', noteSchema);