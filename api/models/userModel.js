const mongoose = require('moongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;
const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(plainTetPW, callback) {
  bcrypt.compare(plainTextPW, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    callBack(null, isValid);
  });
};

module.exports = mongoose.model('User', UserSchema)
