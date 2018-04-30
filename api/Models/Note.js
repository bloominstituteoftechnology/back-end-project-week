const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: User,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },
});

module.exports = mongoose.model('Note', NoteSchema);
