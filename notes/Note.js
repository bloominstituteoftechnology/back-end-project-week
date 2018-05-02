const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: ObjectId,
    ref: 'Tag'
  },
  noteId: {
    type: Number,
    unique: true
  },
  users: {
    type: ObjectId,
    ref: 'User'
  },
  author: {
    type: String
  }
})

module.exports = mongoose.model('Note', NoteSchema)
