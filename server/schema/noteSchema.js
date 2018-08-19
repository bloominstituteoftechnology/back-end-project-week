const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const NoteModel = mongoose.model("Note", NoteSchema, "notes");
module.exports = NoteModel;
