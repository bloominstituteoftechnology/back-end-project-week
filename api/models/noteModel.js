const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

NoteSchema.statics.getNotes = function(cb) {
  Note.find({}, (err, notes) => {
    if (err) return cb(err);
    cb(notes);
  });
};

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
