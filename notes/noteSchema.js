const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true, index: true },
  text: { type: String },
  createdOn: { type: Date, default: Date.now },
  userId: { type: String, required: true, index: true }
});

module.exports = mongoose.model('Note', noteSchema);
