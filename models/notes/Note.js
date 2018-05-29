const mongoose = require('mongoose');

const Note = mongoose.Schema({
  title:  String,
  body: String
});

module.exports = mongoose.model('Note', Note);