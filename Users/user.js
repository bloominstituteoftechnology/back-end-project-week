const mongoose = require('mongoose');
// const objectID = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  created: { type: String }, 
  stamp: { type: String },
});

module.exports = mongoose.model('User', User);
