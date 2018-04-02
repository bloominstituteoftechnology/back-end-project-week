const mongoose = require('mongoose');
const Note = require('./NoteSchema');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
});

module.exports = mongoose.model('User', UserSchema);