const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
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
