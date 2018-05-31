const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  timestamp: true
});

module.exports = mongoose.model("Note", noteSchema);
