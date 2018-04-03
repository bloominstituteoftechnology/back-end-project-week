require("./User");
const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
let ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  text: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", NoteSchema);
