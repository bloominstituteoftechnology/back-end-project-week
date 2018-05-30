const mongoose = require('mongoose');

const Note = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const noteSchema = new mongoose.Schema(definition, options);
const noteModel = mongoose.model('Note', noteSchema, 'notes');

module.exports = noteModel;