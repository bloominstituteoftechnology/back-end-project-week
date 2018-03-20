const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  noteText: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Note', NoteSchema);