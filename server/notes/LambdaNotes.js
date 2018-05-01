const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
notesSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash
    next()
  })
})
module.exports = mongoose.model('LabmdaNotes', notesSchema, 'notes')
