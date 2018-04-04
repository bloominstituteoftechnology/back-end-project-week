const mongoose = require('mongoose');
const { Schema } = mongoose;

const lambdaNotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
});

lambdaNotesSchema.methods.getNoteTitle = function() {
  return this.title;
};

lambdaNotesSchema.statics.getNotes = function(cb) {
  Note.find({}, (err, notes) => {
    if (err) return cb(err);
    cb(notes);
  });
};

const Note = mongoose.model('Note', lambdaNotesSchema);

module.exports = Note;
