const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
});

UserSchema.pre("save", function(next) {
  return bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => next(err));
});

UserSchema.methods.validatePassword = function(inputedPassword) {
  return bcrypt.compare(inputedPassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema, "users");
module.exports = UserModel;
