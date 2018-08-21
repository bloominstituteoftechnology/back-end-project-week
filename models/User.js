const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

UserSchema.pre('save', function(next) {
    return bcrypt
      .hash(this.password, 10)
      .then(hash => {
        this.password = hash;
  
        return next();
      })
      .catch(err => {
        return next(err);
      });
  });
  
  UserSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
  };

module.exports = mongoose.model('User', UserSchema)
