const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  dateString: {
    type: String,
    required: true,
    default: 'n/a'
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
    ref: 'User'
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
