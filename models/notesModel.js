const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "User"
  }
});



module.exports = mongoose.model("Note", NoteSchema);