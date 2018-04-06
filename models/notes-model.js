const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new Schema({
  noteTitle: {
    required: true,
    type: String,
  },
  noteBody: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String
  },
}, {timestamps: true});

NoteSchema.methods.getNoteByTitle = function() {
  return this.noteTitle;
}

NoteSchema.statics.getAllNotes = (cb) => {
  Note.find({}, (err, notes) => {
    if (err) console.error(err);
    cb(notes);
  });
};

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;