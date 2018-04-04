const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
      type: String,
      // unique: true,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      // required: true
    }
  });

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;