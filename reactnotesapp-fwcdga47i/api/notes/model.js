const mongoose = require('mongoose');
const { Schema } = mongoose;
// const mongodAuth = require('../../config').mongodAuth;

// const { mLabUser, mLabPass, mLabUri } =
// require('../../config').mLab || JSON.parse(process.env.CONFIG).mLab;

// const { mLabUser, mLabPass, mLabUri } = require('../../config').mLab;

const { mLabUser, mLabPass, mLabUri } = JSON.parse(process.env.CONFIG).mLab;

mongoose.connect(`mongodb://${mLabUser}:${mLabPass}@${mLabUri}`);
// mongoose.connect('mongodb://localhost/notes_db', mongodAuth);
// mongoose.connect('mongodb://localhost/notes_db');

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

// NoteSchema.methods.getTitle = function() {
//   return this.question;
// };

// NoteSchema.methods.getAnswer = function() {
//   return this.answer || 'Question not answered yet.';
// };

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
