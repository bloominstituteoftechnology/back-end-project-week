const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true // maybe add trim property
    // may need to run match to ensure email is valid
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
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
  // populate
})

// Check database for user with email and authenticate
// UserSchema.statics.authenticate = function (email, password, cb) {
//   User.findOne({ email: email })
//     .exec((err, user) => {
//       if (err) {
//         return cb(err)
//       } else if (!user) {
//         let err = new Error('User not found.');
//         err.status(401);
//         return cb(err);
//       }
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) return cb(err);
//         return cb(null, isMatch);
//       });
//     })
// }

UserSchema.methods.comparePassword = function (attemptedPassword, cb) {
  bcrypt.compare(attemptedPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// hash & salt password b/f saving
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
