const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 12
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
);

User.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

User.methods.checkToken = function(token) {
  if (this.token === token) {
    return true;
  } else return this.token;
};

module.exports = mongoose.model("User", User);
