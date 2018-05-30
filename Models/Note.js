const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  }
})

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
