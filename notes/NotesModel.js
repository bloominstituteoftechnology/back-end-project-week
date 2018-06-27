const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date, default: Date.now
  },
  author: {
    default: "Free Version",
    type: String
    // type: ObjectId,
    // ref: 'User',
    // required: true
  }
});

module.exports = mongoose.model("Note", NotesSchema);