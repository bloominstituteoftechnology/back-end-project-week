const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  cohort: {
    type: String,
    required: true,
    maxlength: 5
  }
});
userSchema.pre('save', function(next) {
  //next event
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;

    next();
  });
});

userSchema.methods.verifyPassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    callback(null, isValid);
  });
};
module.exports = mongoose.model('User', userSchema, 'users');
