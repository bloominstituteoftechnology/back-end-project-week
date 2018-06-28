const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const subtaskSchema = new mongoose.Schema({
  task: {
    type: ObjectId,
    ref: 'Task',
    required: true,
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('Task', val, cb),
      message: 'Must be an id for an existing task'
    }
  },
  description: {
    type: String,
    required: [true, 'Subtask description required']
  },
  completed: {
    type: Boolean,
    required: [true, 'Completed flag required'],
    default: false
  }
});

module.exports = mongoose.model('Subtask', subtaskSchema);
