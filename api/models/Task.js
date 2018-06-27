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
  subtasks: [
    {
      type: ObjectId,
      ref: 'Subtask',
      validate: {
        isAsync: true,
        validator: (val, cb) => objectIdValid('Subtask', val, cb),
        message: 'Must be and id for an existing subtask'
      }
    }
  ],
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
  },
  comments: [
    {
      type: ObjectId,
      ref: 'Comment',
      validate: {
        isAsync: true,
        validator: (val, cb) => objectIdValid('Comment', val, cb),
        message: 'Must be an id for an existing user'
      }
    }
  ],
  attachments: [
    {
      type: ObjectId,
      ref: 'Attachment',
      validate: {
        isAsync: true,
        validator: (val, cb) => objectIdValid('Attachment', val, cb),
        message: 'Must be an id for an existing attachment'
      }
    }
  ]
});

module.exports = mongoose.model('Task', taskSchema);
