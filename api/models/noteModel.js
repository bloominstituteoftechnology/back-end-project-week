const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    default: 'Title'
  },

  content: {
    type: String,
    default: 'Content'
  }
});

module.exports = mongoose.model('Note', NoteSchema);
