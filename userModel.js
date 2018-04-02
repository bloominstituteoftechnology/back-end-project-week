const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  notes: [ObjectId]
});



module.exports = mongoose.model('User', UserSchema);
