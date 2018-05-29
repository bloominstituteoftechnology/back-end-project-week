const mongoose = require('mongoose');

const definition = {
  title: {
    type: String,
    default: 'New Note'
  },
  content: String,
  tags: [String]
}

const noteSchema = new mongoose.Schema(definition);

module.exports = mongoose.model('Note', noteSchema);