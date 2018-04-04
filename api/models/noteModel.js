const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: 'User',
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
