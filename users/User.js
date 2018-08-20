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
    required: true,
    minlength: 4
  },
  created: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: ObjectId,
    ref: 'Note'
  }
})

UserSchema.pre('save', function (next) {
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => next(err))
})

UserSchema.methods.verifyPassword = function (guess, cb) {
  bcrypt.compare(guess, this.password, function (err, isValid) {
    if (err) {
      return cb(err)
    }
    cb(null, isValid)
  })
}

module.exports = mongoose.model('User', UserSchema)
