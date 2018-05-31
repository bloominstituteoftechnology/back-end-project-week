const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = require('mongoose');

const noteModel = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
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
