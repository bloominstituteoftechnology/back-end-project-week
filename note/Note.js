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
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,    
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Note', noteSchema)