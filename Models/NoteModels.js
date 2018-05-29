const mongoose = require('mongoose')

const definiton = {
  Title:{
    type: String,
    required: true,
  },
  Content:{
    type: String,
    required: false,
  },
  createdOn:{
    type: Date,
    default: Date.now,
  },
}

const options = {
  timestamps: true,
}

const noteSchema = new mongoose.Schema(definiton, options)

const Note = mongoose.model('Note', noteSchema)

mongoose.exports = Note;
