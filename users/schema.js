const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { ObjectId } = mongoose.Schema.Types

const Users = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'The first name field is required.'],
    maxlength: [30, 'The first name field may only contain a maximum of 30 characters.']
  },
  lastname: {
    type: String,
    required: [true, 'The last name field is required.'],
    maxlength: [30, 'The last name field may only be a maximum of 30 characters.'],
  },
  email: {
    type: String,
    required: [true, 'The email field is required.'],
    unique: true,
    maxlength: [30, 'The email field may only contain a maximum of 30 characters.'],
    lowercase: [true, 'The email field may only contain lowercase characters.'],
    validate: {
      validator: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      },
      message: 'Invalid email.'
    }
  },
  password: {
    type: String,
    required: [true, 'The password field is required.'],
    minlength: [8, 'The password field may only contain a minimum of 8 characters.'],
    maxlength: [30, 'The password field may only contain a maximum of 30 characters.']
  },
  notes: [{
    type: ObjectId,
    ref: 'Notes'
  }]
},
{
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id;
    }
  }
})

Users.pre('save', function (next) {
  console.log('save test')
  return bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash
      return next()
    })
    .catch(error => {
      return next(error)
    })
})

Users.methods.validatePassword = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password)
}

module.exports = mongoose.model('Users', Users)