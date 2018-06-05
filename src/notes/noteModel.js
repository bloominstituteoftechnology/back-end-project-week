const mongoose = require('mongoose');

const NoteModel = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true
  },
  noteBody: {
    type: String,
    required: true
  },
  createdOn: {
    date: Date
  }
});

module.exports = mongoose.model('Note', NoteModel);