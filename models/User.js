const mongoose = require("mongoose");

const User = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", User);
