const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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

userSchema.pre("save", function(next) {
  return bcrypt.hash(this.password, 13, (err, hashedPW) => {
    if (err) return next(err)
    this.password = hashedPW
    return next()
  })
})

module.exports = mongoose.model("User", userSchema)