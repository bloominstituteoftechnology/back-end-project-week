const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema(
  {
    firstname: {
      type: String,
      default: '',
      trim: true
    },
    lastname: {
      type: String,
      default: '',
      trim: true
    },
    username: {
      type: String,
      index: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      minlength: 4,
      maxlength: 50,
      required: [true, `can't be blank`],
      trim: true,
      unique: true
    },
    email: {
      type: String,
      index: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      minlength: 5,
      maxlength: 254,
      required: [true, `can't be blank`],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    notes: [{ type: ObjectId, ref: 'Note' }],
    roles: {
      type: [{
        type: String,
        enum: ['public', 'user', 'admin']
      }],
      default: ['user']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true
  }
)

schema.plugin(uniqueValidator, { message: 'is already taken.' })

schema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

schema.pre('update', async function(next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

schema.methods.verifyPassword = async function(pw) {
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
