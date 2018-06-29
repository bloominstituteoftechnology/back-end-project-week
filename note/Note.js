const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  checklist: {
    type: String
  }
})

module.exports = mongoose.model('Note', noteSchema)