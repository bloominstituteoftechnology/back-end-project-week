const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tagSchema = new mongoose.Schema({
  project: {
    type: ObjectId,
    ref: 'Project',
    required: true,
    validate: {
      isAsync: true,
      validator: (val, cb) => objectIdValid('Project', val, cb),
      message: 'Must be an id for an existing project'
    }
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true,
    enum: ['black', 'white', 'blue', 'green', 'red', 'yellow', 'purple']
  }
});

module.exports = mongoose.model('Tag', tagSchema);
