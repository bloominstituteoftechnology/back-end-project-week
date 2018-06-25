const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {
  UserNotFoundError,
  InvalidPasswordError
} = require('../server/errors')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  session: String
})

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    this.session = Date.now()
  }
  next()
})

userSchema.statics.login = async function (userData) {
  let user = await this.findOne({ username: userData.username })
  if (!user) {
    throw new UserNotFoundError(userData.username)
  }

  const valid = await bcrypt.compare(userData.password, user.password)

  if (!valid) {
    throw new InvalidPasswordError()
  }
  
  user.update({ session: Date.now() })
  return user
}

module.exports = mongoose.model('User', userSchema)