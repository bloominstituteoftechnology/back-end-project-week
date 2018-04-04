const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

mongoose.connect('mongoose://localhost/NoteSchema');

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
