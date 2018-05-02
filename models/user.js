const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcrypt');

const rounds = 12;

const Note = require('./note');

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
  notes: [{ type: ObjectId, ref: 'Note' }],
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, rounds, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    return next();
  });
});

UserSchema.methods.isPasswordValid = function(passwordGuess, cb) {
  bcrypt.compare(passwordGuess, this.password, function(err, isValid) {
    if (err) {
      return cb(err);
    }
    return cb(null, isValid);
  });
};

module.exports = mongoose.model('User', UserSchema);
