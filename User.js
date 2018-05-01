const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
});

userSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10).then(hash => {
      this.password = hash;

      next();
    });
  });

  userSchema.methods.verifyPassword = function(guess, callback) {
    bcrypt.compare(guess, this.password, function(err, isValid) {
      if (err) {
        return callback(err);
      }
      callback(null, isValid);
    });
  };

  userSchema.methods.verifyUsername = function(guess, callback) {
      let usernameVal = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return usernameVal.test(username);
  }

  module.exports = mongoose.model("User", userSchema);