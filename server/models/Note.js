const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: String,
  text: String,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('notes', noteSchema);
