const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    default: 'No text'
  }
});

module.exports = mongoose.model('Note', noteSchema);