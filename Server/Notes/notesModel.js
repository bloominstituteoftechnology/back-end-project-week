const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String
  },

  tags: {
    type: Array
  }
});

module.exports = mongoose.model('Note', noteSchema, 'notes'); //final selection tells which collection
// however it is unnecessary because if
// the collection doesnt exist, it will automatically
// be created based off the first argument, converted to
// lowercase
