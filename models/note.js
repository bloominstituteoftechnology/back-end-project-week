const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  scribe: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  // tags / category ????
})

module.exports = mongoose.model('Note', NoteSchema);