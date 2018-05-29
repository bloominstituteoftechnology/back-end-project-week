const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Note = require('./NoteSchema');
const mongooseTypes = require('mongoose-types');

mongooseTypes.loadTypes(mongoose, 'email');

const Email = mongoose.SchemaTypes.Email;

const UserSchema = new mongoose.Schema({
  username: {
    type: Email,
    unique: true,
    lowercase: true,
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
  securePW: false,
});

UserSchema.pre('save', function(next) {
  if (this.securePW) return next();
  bcrypt.hash(this.password, 11, (err, hashed) => {
    if (err) return next(err);
    this.password = hashed;
    this.securePW = true;
    next();
  });
});

UserSchema.methods.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);