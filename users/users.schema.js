const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 13

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
  return bcrypt.hash(this.password, saltRounds, (err, hashedPW) => {
    if (err) return next(err)
    this.password = hashedPW
    return next()
  })
})

userSchema.methods.validatePassword = function(plainText, callback) {
  return bcrypt.compare(plainText, this.password, (err, valid) => {
    return err ? callback(err) : callback(null, valid)
  })
}

module.exports = mongoose.model("User", userSchema)