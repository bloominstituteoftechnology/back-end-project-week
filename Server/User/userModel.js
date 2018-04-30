const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // no users can have the same username
    lowercase: true // convert to lowercase before storage
  },

  password: {
    type: String,
    required: true, // require a password
    minlength: 4 // set minimum length of password
  },

  race: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  //dont user arrow function because you need THIS access of user object (that calls this in routes.js)
  bcrypt
    .hash(this.password, 10) // 10 increases depth of hashing, adding time to how long it takes
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(error => res.send(404).json(error));
});

userSchema.methods.verifyPassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, function(err, isValid) {
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
