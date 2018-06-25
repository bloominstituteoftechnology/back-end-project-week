const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  note: {
    type: ObjectId,
    ref: 'notes'
  }
})
userSchema.pre('save', function (next) {
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => {
      console.log(err)
    })
})
userSchema.methods.verifyPassword = function (guess, callback) {
  bcrypt.compare(guess, this.password, function (err, isValid) {
    if (err) {
      return callback(err)
    }
    callback(null, isValid)
  })
}
module.exports = mongoose.model('User', userSchema)
