const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
  project: {
    type: ObjectId,
    ref: 'Project',
    required: [true, 'Project id required'],
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('Project', val, cb),
      message: 'Must be an id for an existing project'
    }
  },
  title: {
    type: String,
    required: [true, 'Task title required']
  },
  description: {
    type: String
  },
  assignee: [
    {
      type: ObjectId,
      ref: 'User',
      validate: {
        isAsync: true,
        validator: (val, cb) => objectIdValid('User', val, cb),
        message: 'Must be an id for an existing user'
      }
    }
  ],
  dueDate: {
    type: Date
  },
  tags: [
    {
      type: ObjectId,
      ref: 'Tag',
      validate: {
        isAsync: true,
        validator: (val, cb) => objectIdValid('Tag', val, cb),
        message: 'Must be an id for an existing tag'
      }
    }
  ],
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', taskSchema);
