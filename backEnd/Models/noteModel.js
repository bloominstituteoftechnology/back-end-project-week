const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now
}
})

const options = {
timestamps: true
};




const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
