const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Data.now,
    required: true
  }
});

mongoose.connect('mongodb://localhost/noteSchema');

module.exports = mongoose.model('noteSchema', noteSchema)