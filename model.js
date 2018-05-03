const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.models = {};
mongoose.modelSchemas = {};

const User = require('./model.js');

mongoose.connect('mongodb://kennington:123@dbh61.mlab.com:27617/lambdanotes');

const UserSchema = new mongoose.Schema({
  // TODO: fill in this schema
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});
UserSchema.methods.isPassWordValid = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};
module.exports = mongoose.model('User', UserSchema);
