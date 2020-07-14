const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    // required: true,
    // minlength: 12,
  },
  notes: [{
    type: ObjectId,
    ref: 'Note'
  }]
});

module.exports = mongoose.model('User', userSchema);