const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_ROUNDS = 11;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: 'String',
    required: true
  },
  lastName: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  notes: {
    type: [ObjectId],
    ref: 'Note',
    required: false
  }
});

UserSchema.pre('save', function(next) {
  console.log('Pre Save Hook');
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

UserSchema.methods.isPasswordValid = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', UserSchema);
