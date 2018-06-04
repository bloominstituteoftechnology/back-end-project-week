const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
});

module.exports = mongoose.model('Notes', NoteSchema);