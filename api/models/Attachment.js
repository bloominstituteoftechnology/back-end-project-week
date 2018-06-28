const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
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
