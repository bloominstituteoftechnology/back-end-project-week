const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  tags: String
});

module.exports = mongoose.model('Note', noteSchema);
