const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;



const userSchema = Schema({

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
    maxlength: 25,
    validate: checkPasswordLength,
    msg: 'password is too weak',
  },

});
userSchema.pre('save', function (next) { // this hashes password before it saves to database
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
// methods
function checkPasswordLength(password) {
  return password.length > 4; // should be set to 12 in production
}

userSchema.methods.validatePassword = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('userModel', userSchema);