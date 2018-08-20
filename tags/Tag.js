const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const TagSchema = new Schema({
  value: {
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
  notes: {
    type: ObjectId,
    ref: 'Note'
  }
})

module.exports = mongoose.model('Tag', TagSchema)
