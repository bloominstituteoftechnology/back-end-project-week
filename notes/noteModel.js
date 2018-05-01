const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
});

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;
