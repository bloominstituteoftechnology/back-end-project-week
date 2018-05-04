const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  sub: {
    type: String,
    required: true
  },

  notes: {
    type: Array,
    required: true
  }
});

userSchema.pre('save', function(next) {
  //dont user arrow function because you need THIS access of user object (that calls this in routes.js)
  if (this.sub.includes('auth0|')) {
    bcrypt
      .hash(this.sub, 10) // 10 increases depth of hashing, adding time to how long it takes
      .then(hash => {
        this.sub = hash;
        next();
      })
      .catch(error => res.send(404).json(error));
  } else {
    next();
  }
});

userSchema.methods.verifySub = function(guess, callback) {
  bcrypt.compare(guess, this.sub, function(err, isValid) {
    if (err) {
      return callback(err);
    }

    //no error
    callback(null, isValid);
  });
};

module.exports = mongoose.model('User', userSchema, 'users'); //final selection tells which collection
// however it is unnecessary because if
// the collection doesnt exist, it will automatically
// be created based off the first argument, converted to
// lowercase
