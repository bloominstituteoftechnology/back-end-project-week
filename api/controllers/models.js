const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [NoteSchema]
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Note: mongoose.model("Note", NoteSchema)
}
