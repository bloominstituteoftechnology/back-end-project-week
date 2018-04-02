const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

require('./userModel');

const NoteSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
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
