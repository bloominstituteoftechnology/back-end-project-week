const mongoose = require('mongoose')
const _id = mongoose.SchemaTypes.ObjectId

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  authors: [{ type: _id, ref: 'User' }]
})

module.exports = mongoose.model('Note', noteSchema)