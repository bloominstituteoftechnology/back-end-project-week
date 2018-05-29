const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    unique: true,
    required: true 
  },
  body: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model('Notes', NoteSchema);