const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

mongoose.connect('mongodb://localhost/noteSchema');

module.exports = mongoose.model('noteSchema', noteSchema);