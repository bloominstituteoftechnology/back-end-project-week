const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
