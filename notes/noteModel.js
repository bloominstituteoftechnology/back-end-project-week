const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteModel = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Note", noteModel, "notes");
