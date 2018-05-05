const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

NoteSchema.methods.getNote = function() {
  return this.note;
};

NoteSchema.statics.getAllNotes = function(callback) {
  Note.find({}, (err, notes) => {
    if (err) return callBack(err);
    callBack(notes);
  });
};

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
