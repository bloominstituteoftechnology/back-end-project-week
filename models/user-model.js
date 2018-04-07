const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/users');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', function(next) {
    // generate the salt and hash the pw
    bcrypt.hash(this.passwordHash, 11, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
});

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
    // check passwords
    bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

module.exports = mongoose.model('User', UserSchema);