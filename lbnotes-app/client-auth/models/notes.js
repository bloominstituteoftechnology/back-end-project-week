const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    lowercase: true,
    required: true,
  },
  body: {
    type: String,
    lowercase: true,
    required: true,
  },
});

module.exports = mongoose.model('Notes', NoteSchema);
