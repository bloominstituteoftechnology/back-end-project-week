const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 32,
  },
  body: { type: String, default: 'Default Entry' },
});

module.exports = mongoose.model('Note', Note);
