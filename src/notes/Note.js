const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Note', noteSchema);
