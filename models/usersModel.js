const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.models = {};
mongoose.modelSchemas = {};

const User = require('./userModel.js');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true
  },
  // password: {
  //   type: String,
  //   required: true
  // },
  notes: {
    type: ObjectId,
    ref: 'Note'
  }
});

// UserSchema.pre('save', function(next) {
//   bcrypt
//     .hash(this.password, 8)
//     .then(hash => {
//       this.password = hash
//       next()
//     })
//     .catch(err => next(err))
// });

// UserSchema.methods.verifyPassword = function(passwordGuess, cb) {
//   bcrypt.compare(passwordGuess, this.password, function (err, isValid) {
//     if (err) {
//       return cb(err)
//     }
//     cb(null, isValid)
//   })
// };

module.exports = mongoose.model('User', UserSchema);