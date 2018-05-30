const mongoose = require('mongoose')
const User = require('./User')
const _id = mongoose.Schema.Types.ObjectId

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: { type: _id, ref: 'User' },
  collaborators: [{ type: _id, ref: 'User' }]
})

module.exports = mongoose.model('Note', noteSchema)