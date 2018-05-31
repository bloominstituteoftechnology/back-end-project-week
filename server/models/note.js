const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: false }
})

module.exports = mongoose.model('Note', NoteSchema)
