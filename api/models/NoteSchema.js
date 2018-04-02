const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Note', NoteSchema);