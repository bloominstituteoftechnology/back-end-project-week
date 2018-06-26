const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = new mongoose.Schema ( {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Note', Note);