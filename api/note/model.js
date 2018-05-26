const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  author: { type: ObjectId, ref: 'User' },
  content: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: new Date
  },
  title: {
    type: String,
    maxlength: 24,
    required: true
  }
})

module.exports = mongoose.model('Note', schema)