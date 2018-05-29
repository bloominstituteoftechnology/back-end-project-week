const mongoose = require("mongoose");

const Note = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model("Note", Note);
