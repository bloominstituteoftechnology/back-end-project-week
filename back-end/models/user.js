const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 13;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (error, hash) => {
    if (error) throw new Error(error);
    this.password = hash;
    next();
  })
})

UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, checked) => {
    if (error) throw new Error(error);
    callback(null, checked);
  })
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
