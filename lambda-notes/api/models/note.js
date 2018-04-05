const mongoose = require('mongoose');

mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://heroku_7957gfbt:jv1e3gq0ma3fsmrb1erhfftnpj@ds217349.mlab.com:17349/heroku_7957gfbt');

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
