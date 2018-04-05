const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

require('./userModels');

const NoteSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
   }
});

module.exports = mongoose.model('Note', NoteSchema);