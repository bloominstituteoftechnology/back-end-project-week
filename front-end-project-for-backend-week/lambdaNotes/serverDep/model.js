const mongoose = require('mongoose');
const { Schema } = mongoose;
// This is our video game schema. Notice the two methods below
// Notice the fields that are required when saving data to this model
// Notice that release date is just a string. I don't want you to have to worry about dates :)
const lambdaNotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
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

const Note = mongoose.model('SCOOBY-DOO', lambdaNotesSchema);

module.exports = Note;
