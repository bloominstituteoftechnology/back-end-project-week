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
  },
  username: {
    type: String,
    default: 'unknown'
  },
  tags: {
    type: Array
  },
  note_id: {
    type: Number,
    unique: true
  }
})

let id = 1
NoteSchema.pre('save', function (next) {
  this.note_id = id
  id++
  next()
})

module.exports = mongoose.model('Note', NoteSchema)
