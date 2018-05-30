const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteModel = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = mongoose.model("Note", noteModel, "notes");
