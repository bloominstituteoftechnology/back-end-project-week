const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const attachmentSchema = new mongoose.Schema({
  task: {
    type: ObjectId,
    ref: 'Task',
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('Task', val, cb),
      message: 'Must be an id for an existing task'
    }
  },
  name: {
    type: String,
    required: [true, 'Attachment name required']
  },
  link: {
    type: String,
    required: [true, 'Attachment link required']
  }
});

module.exports = mongoose.model('Attachments', attachmentSchema);
