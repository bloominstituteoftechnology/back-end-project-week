const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);