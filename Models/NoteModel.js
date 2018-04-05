const mongoose = require('mongoose');
ObjectId = mongoose.SchemaTypes.ObjectId;

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Note', NoteSchema);
