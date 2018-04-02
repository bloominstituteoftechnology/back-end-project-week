const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  noteTitle: {
    required: true,
    type: String,
  },
  noteBody: {
    required: true,
    type: String,
  },
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

NoteSchema.methods.getNoteByTitle = function() {
  return this.noteTitle;
}

NoteSchema.statics.getAllNotes = (cb) => {
  Note.find({}, (err, notes) => {
    if (err) console.error(err);
    cb(notes);
  });
};

const Record = mongoose.model('Note', NoteSchema);

module.exports = Note;