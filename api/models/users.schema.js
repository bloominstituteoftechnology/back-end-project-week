const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const ObjectId = mongoose.Schema.Types.ObjectId
const saltRounds = 13

const userSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['local', 'google']
  },
  local: {
    username: {
      type: String,
      unique: true,
      minlength: 5,
      lowercase: true
    },
    password: {
      type: String,
      minlength: 5
    }
  },
  google: {
    id: String,
    email: { type: String, lowercase: true, unique: true }
  },
})

userSchema.pre("save", function(next) {
  if (this.method !== 'local') return next();
  return bcrypt.hash(this.local.password, saltRounds, (err, hashedPW) => {
    if (err) return next(err)
    this.local.password = hashedPW
    return next()
  })
})

userSchema.methods.validatePassword = function(plainText) {
  return bcrypt.compare(plainText, this.local.password)
}

module.exports = mongoose.model("User", userSchema)