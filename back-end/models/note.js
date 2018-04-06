const mongoose = require('mongoose');

var dateobject = new Date();
var datestring = dateobject.toISOString().slice(0, 10);
const NoteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: dateobject,
  },
  dateString: {
    type: String,
    required: true,
    default: datestring,
  },
  checklist: {
    type: Array,
    required: true,
    default: [],
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
