const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  dateString: {
    type: String,
    required: true,
  },
  checklist: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled',
  },
  body: {
    type: String,
    required: true,
    default: '...',
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
