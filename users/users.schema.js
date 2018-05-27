const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  notes: [{
    title: String,
    content: String,
  }]
})

module.exports = new mongoose.Model("User", userSchema)