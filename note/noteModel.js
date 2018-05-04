const mongoose = require('mongoose');

const Note = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model('Note', Note);
