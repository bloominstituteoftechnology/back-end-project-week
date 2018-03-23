const mongoose = require('mongoose');
const { Schema } = mongoose;
const { mLabUser, mLabPass, mLabUri } = JSON.parse(process.env.CONFIG).mLab;

mongoose.connect(`mongodb://${mLabUser}:${mLabPass}@${mLabUri}`);

const NoteSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

NoteSchema.statics.getAllNotes = cb => {
  Note.find({}, (err, notes) => {
    if (err) {
      cb({ err: err });
      return;
    }

    cb(notes);
  });
};

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
