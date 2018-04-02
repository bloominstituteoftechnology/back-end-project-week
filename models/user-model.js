const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

  UserSchema.pre('save', function(next) {
    bcrypt
      .hash(this.password, SALT_ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => err);
  });

  UserSchema.methods.checkPassword = (user, potentialPassword) => {
    return new Promise((resolve, reject) => {
      return bcrypt
        .compare(potentialPassword, user.password)
        .then((isMatch) => {
          resolve(isMatch);
        })
        .catch((err) => reject(err));
    }).catch((err) => err);
  };

// if you're really stuck with this at this point, you can reference this document.
// https://github.com/LambdaSchool/Auth-JWT/blob/master/models/index.js This is what we're going for here.

module.exports = mongoose.model('User', UserSchema);
