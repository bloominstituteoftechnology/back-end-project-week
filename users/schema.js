const MONGOOSE = require('mongoose')
const BCRYPT = require('bcrypt')

const { ObjectId } = MONGOOSE.Schema.Types

const Users = new MONGOOSE.Schema({
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
      validator: email => /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
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
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id;
    }
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id;
    }
  }
})

Users.pre('save', function(next) {
  return BCRYPT
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => {
      next(err)
    })
})

Users.methods.validatePassword = function(passwordGuess) {
  return BCRYPT.compare(passwordGuess, this.password)
}

module.exports = MONGOOSE.model('Users', Users)