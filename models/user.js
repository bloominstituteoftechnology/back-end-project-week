import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
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

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err)

    this.password = hash
    next()
  })
})

UserSchema.methods.checkPassword = function(passwordGuess, cb) {
  bcrypt.compare(passwordGuess, this.password, (err, isMatch) => {
    if (err) return cb(err)

    cb(null, isMatch)
  })
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
