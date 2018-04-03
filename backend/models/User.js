const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = new mongoose.Schema();

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true
  },
  lastName: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(hashPass, callback) {
  bcrypt.compare(hashPass, this.password, (err, doesMatch) => {
    if (err) return callback(err);
    callback(doesMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
