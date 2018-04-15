const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const NoteSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [NoteSchema],
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = async function(plainTextPW) {
  return await bcrypt.compare(plainTextPW, this.password);
};

const User = mongoose.model('User', UserSchema);
const Note = mongoose.model('Note', NoteSchema);

module.exports = { User, Note };