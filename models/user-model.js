const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/users', { useMongoClient: true });

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
});

UserSchema.pre('save', function(next) {
    // generate the salt and hash the pw
    bcrypt.hash(this.password, 11, (err, hash) => {
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