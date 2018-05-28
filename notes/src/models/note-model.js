const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes');

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Note', NoteSchema);
