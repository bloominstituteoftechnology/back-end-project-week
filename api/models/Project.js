const mongoose = require('mongoose');
const { objectIdValid } = require('../utils/objectIdValid');
const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title required'],
    unique: true
  },
  description: {
    type: String
  },
  members: [
    {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Project must contain at least one user'],
      validate: {
        isAsync: true,
        validator: (val, cb) => objectIdValid('User', val, cb),
        message: 'Must be an id for an existing user'
      }
    }
  ]
});

projectSchema.methods.isValidUser = function (userId) {
  return this.members.includes(userId);
}

module.exports = mongoose.model('Project', projectSchema);
