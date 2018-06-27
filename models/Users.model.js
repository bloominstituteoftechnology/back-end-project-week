const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User.pre('save', function(next) {
  return bcrypt
    .hash(this.password, 12)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => {
      return next(err);
    });
});

User.methods.validatePassword = function(noHashedPassword) {
  return bcrypt.compare(noHashedPassword, this.password);
};

module.exports = mongoose.model('Users', User);
