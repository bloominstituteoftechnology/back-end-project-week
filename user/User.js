const mongoose = require('mongoose')

const passwordLength = 4

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: checkPasswordLength,
    message: `Password must be at least ${passwordLength} characters long`
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})

const checkPasswordLength = password => password.length >= passwordLength

module.exports = mongoose.model('User', userSchema)