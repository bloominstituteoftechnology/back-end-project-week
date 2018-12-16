const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  body: {
    type: String,
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Note", NoteSchema);
