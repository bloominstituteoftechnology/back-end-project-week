const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);