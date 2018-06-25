const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const passwordLength = 4
const SALT_ROUNDS = 12

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

userSchema.pre('save', function(next) {
  return bcrypt.hash(this.password, SALT_ROUNDS)
    .then( hashedPassword => {
      this.password = hashedPassword
      return next()
    })
    .catch( err => {
      return next(err)
    })
})

userSchema.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password)
}

module.exports = mongoose.model('User', userSchema)