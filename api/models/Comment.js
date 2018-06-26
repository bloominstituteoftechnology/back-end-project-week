const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('User', val, cb),
      message: 'Must be an id for an existing user'
    }
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('Comment', commentSchema);