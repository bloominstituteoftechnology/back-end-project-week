const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled",
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Note", NotesSchema);
