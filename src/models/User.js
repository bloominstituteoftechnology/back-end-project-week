const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const _id = mongoose.SchemaTypes.ObjectId

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
  notes: [{ type: _id, ref: 'Note' }]
})

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(next)
})

module.exports = mongoose.model('User', userSchema)