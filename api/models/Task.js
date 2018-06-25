const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
  project: {
    type: ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  assignee: {
    type: ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Date
  },
  subtasks: {
    type: [ObjectId],
    ref: 'Subtask'
  },
  tags: {
    type: [ObjectId],
    ref: 'Tag'
  },
  completed: {
    type: Boolean,
    default: false
  },
  comments: {
    type: [ObjectId],
    ref: 'Comment'
  },
  attachments: {
    type: [ObjectId],
    ref: 'Attachment'
  }
});

module.exports = mongoose.model('Task', taskSchema);
