const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // users: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model('Note', noteSchema);