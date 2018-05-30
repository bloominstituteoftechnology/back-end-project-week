const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteModel = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteModel);
