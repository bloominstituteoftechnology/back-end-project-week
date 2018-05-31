const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const objectId = mongoose.Schema.Types.ObjectId;
const saltRounds = 12

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  return bcrypt.hash(this.password, saltRounds, (err, hashedPW) => {
    if (err) return next(err);
    this.password = hashedPW;
    return next();
  });
});

UserSchema.methods.validatePassword = function(plainText, callback) {
  return bcrypt.compare(plainText, this.password, (err, valid) => {
    return err ? callback(err) : callback(null, valid);
  });
};

module.exports = mongoose.model('User', UserSchema);