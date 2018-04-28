const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: {
    type: mongoose.Schema.Types.ObjectID, ref: 'Note'
  },
});

module.exports = mongoose.model('User', UserSchema);
