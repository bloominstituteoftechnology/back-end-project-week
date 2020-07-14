const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

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

  userId: {
    type: ObjectId,
    ref: 'users'
  },

  username: {
    type: String
  },

  modifiedOn: {
    type: Date,
    default: Date.now,
    timestamps: true
  }
})

module.exports = mongoose.model('Note', notesSchema)
