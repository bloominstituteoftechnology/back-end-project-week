const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{
    type: ObjectId, 
    ref: 'Note' 
  }],
});

User.pre('save', function (next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

User.methods.isPasswordValid = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password, (err, res) => {
    if (res) {
      return res;
    }
    else return res;
  });
};

User.methods.addNote = function (note_id) {
  this.notes.push(note_id);
};

module.exports = mongoose.model('User', User);