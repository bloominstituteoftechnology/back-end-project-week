const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: ObjectId,
    required: true,
    unique: true,
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
