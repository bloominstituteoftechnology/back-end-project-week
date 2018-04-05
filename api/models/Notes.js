const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user:{
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Note", NoteSchema);
