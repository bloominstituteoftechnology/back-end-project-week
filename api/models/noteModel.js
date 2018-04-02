const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = mongoose.Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },

  title: {
    type: String,
    default: 'Title'
  },

  content: {
    type: String,
    default: 'Content'
  }
});

module.exports = mongoose.model('Note', NoteSchema);
