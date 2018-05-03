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
  users: {
    type: ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Note', NoteSchema)
