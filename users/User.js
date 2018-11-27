const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4, // make this at least 12 in production
    }
  }
);

User.pre('save', function (next) {
    return bcrypt.hash(this.password, Number(process.env.hash_times)).then(hash => {
      this.password = hash;
      return next();
    }).catch(err => {
      return next(err);
    });
  }
);

User.methods.validatePassword = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', User);