const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    console.log(hash);
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

UserSchema.methods.isPasswordValid = (passwordGuess, passwordHash) => {
  return bcrypt.compare(passwordGuess, passwordHash);
};



module.exports = mongoose.model('User', UserSchema);