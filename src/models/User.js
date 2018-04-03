const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// will replace this later with something more secure
const secret = 11;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  // generate the salt and hash the pw
  bcrypt.hash(this.password, secret, (err, hash) => {
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

module.exports = mongoose.model("User", UserSchema);
