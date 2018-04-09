const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteModels = Schema({
  "title": {
    type: String,
    required: true
  },
  "message": {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Note', NoteModels, 'lambdanotes');
