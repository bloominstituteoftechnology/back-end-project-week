const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Note = require('./NoteSchema');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hashed) => {
    if (err) return next(err);
    this.password = hashed;
    next();
  });
});

UserSchema.methods.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);