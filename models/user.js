const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

SALT_FACTOR = 11;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

userSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, SALT_FACTOR)
    .then(hash => {
      this.password = hash;

      next();
    })
    .catch(err => {
      return next(err);
    });
});

userSchema.methods.verifyPassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, function(err, isValid) {
    if (err) {
      return callbackify(err);
    }
    callback(null, isValid);
  });
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;