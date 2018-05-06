const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema(
  {
    firstname: String,
    lastnamename: String,
    username: {
      type: String,
      index: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      minlength: 4,
      required: [true, `can't be blank`],
      unique: true
    },
    email: {
      type: String,
      index: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: [true, `can't be blank`]
    },
    password: {
      type: String,
      required: true
    },
    notes: [{ type: ObjectId, ref: 'Note' }],
  },
  {
    timestamps: true
  }
)

schema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

schema.pre('update', async function(next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

schema.methods.compare = async function(pw) {
  return await bcrypt
    .compare(pw, this.password)
    .catch(err => console.log(err.message))
}

schema.methods.getPublicFields = function() {
  return {
    firstname: this.firstname,
    lastname: this.lastname,
    username: this.username,
    email: this.email,
    notes: this.notes
  }
}

module.exports = mongoose.model('User', schema)
