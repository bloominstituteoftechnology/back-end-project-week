const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true // maybe add trim property
    // may need to run match to ensure email is valid
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: { // check against password inside post route
    type: String,
    required: true
  }
  // array of notes ??
})

// Check database for user with email and authenticate
UserSchema.statics.authenticate = function(email, password, cb) {
  User.findOne({ email: email })
    .exec((err, user) => {
      if (err) {
        return cb(err)
      } else if (!user) {
        let err = new Error('User not found.');
        err.status(401);
        return cb(err);
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return cb(null, user);
        } else {
          return cb();
        }
      })
    })
}

// hash & salt password b/f saving
UserSchema.pre('save', next => {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema);