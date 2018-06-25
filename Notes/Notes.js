const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = new mongoose.Schema({
  user_id: {
    type: ObjectId, 
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('Note', Note);