const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    user: {
        type: Schema.Types.ObjectId,
		ref: "User"
    }
  });

  module.exports = mongoose.model("Note", NoteSchema);
