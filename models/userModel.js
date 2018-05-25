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
  password: {
    type: String,
    required: true
  },
  notes: [{ type: ObjectId, ref: '' }]
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
