const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now,
    timestamps: true
  },
  modfiedOn: {
    type: Date,
    default: Date.now,
    timestamps: true
  }
})

module.exports = mongoose.model('Note', notesSchema)
