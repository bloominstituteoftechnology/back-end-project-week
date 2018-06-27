const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled'
  },
  text: {
    type: String
  },
  tags: [{
    type: String,
  }],
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    type: ObjectId,
    ref: 'User'
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Allows $text operator on these fields (?)
NotesSchema.index({ title: 'text', text: 'text', tags: 'text' });

module.exports = mongoose.model('Note', NotesSchema);
