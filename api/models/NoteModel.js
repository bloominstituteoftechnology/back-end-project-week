const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  }
});

//=========================================
//            Test Functions
//=========================================

NoteSchema.methods.getTitle = function() {
  return this.title;
};

module.exports = mongoose.model('Note', NoteSchema);