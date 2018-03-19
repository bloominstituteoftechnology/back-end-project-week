const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongodAuth = require('../../config').mongodAuth;

mongoose.connect('mongodb://localhost/notes_db', mongodAuth);
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

// NoteSchema.statics.getAllAmas = cb => {
//   Ama.find({}, (err, amas) => {
//     if (err) console.log(err);

//     cb(amas);
//   });
// };

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
