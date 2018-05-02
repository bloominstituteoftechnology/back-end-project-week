const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});
// pre save hook

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 5, (err, hash) => {
    if (err) {
      // console.log(err);
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

// verify password validity
userSchema.methods.checkPassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, (err, isValid) => {
    if (err) {
      return callback(err);
    }
    callback(null, isValid);
  });
};

module.exports = mongoose.model('User', userSchema);

// userSchema.pre('save', function(next) {
//   bcrypt
//     .hash(this.password, 10)
//     .then(hash => {
//       this.password = hash;
//
//       next();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });
