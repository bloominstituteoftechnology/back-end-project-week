const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 11)
  this.password = hash
  next()
})

UserSchema.methods.checkPassword = function(passwordGuess, cb) {
  bcrypt.compare(passwordGuess, this.password, (err, isMatch) => {
    if (err) return cb(err)

    return cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
