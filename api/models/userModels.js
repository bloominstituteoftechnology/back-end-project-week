const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = new Schema({
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

UserSchema.pre('save', function(next) {
  let user = this;
  bcrypt.hash(this.password, SALT_ROUNDS, function(error, hash) {
    if (error) return next(error);
    user.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
  bcrypt.compare(plainTextPW, this.password, (error, isMatch) => {
    if (error) return callBack(error);
    callBack(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);