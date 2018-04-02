const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
      type: String,
      unique: true,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.model('Note', NoteSchema);