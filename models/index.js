const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  // username: {
  //   type: String,
  //   unique: true,
  //   lowercase: true,
  //   required: true
  // },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// notice something new here you haven't seen yet. This is a 'pre save hook'
// its sole purpose is to take whatever tries to get saved to the 'password' field and change it
// the rest you have seen, bcrypt!!!!
// you can effectively think of this hook as a function that is encrypting pw's for us.
UserSchema.pre('save', function(next) {
  // generate the salt and hash the pw
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// This is also new to you.
// Looking at this we can assume that every instance of "User" will have access to this method
// We're using this method to decypher any encrypted passwords when a user logs in
// For reference of how we're using this method, see the
UserSchema.methods.checkPassword = function(potentialPassword, cb) {
  // check passwords
  bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);