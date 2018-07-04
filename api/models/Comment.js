const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
  task: {
    type: ObjectId,
    ref: 'Task',
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('Task', val, cb),
      message: 'Must be an id for an existing task'
    }
  },
  comment: {
    type: String,
    required: [true, 'Comment required'],
    minlength: [1, 'Comment required']
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Author of comment required'],
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('User', val, cb),
      message: 'Must be an id for an existing user'
    }
  },
  date: {
    type: Date,
    required: [true, 'Comment date required'],
    default: Date.now()
  },
  edited: {
    type: Boolean,
    required: [true, 'Edited status required.'],
    default: false
  }
});

module.exports = mongoose.model('Comment', commentSchema);
