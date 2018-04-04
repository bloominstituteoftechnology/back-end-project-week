const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/notes');

const NoteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true
  },
  noteContent: {
    type: String,
    required: true,
  }
});

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
