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
  });

  const NoteModel = mongoose.model('NoteTater', NoteSchema);

  module.exports = NoteModel;
