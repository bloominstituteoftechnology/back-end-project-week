const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash pw before saving to db
userSchema.pre("save", function(next) {
  console.log("PRE SAVE HOOK!");
  bcrypt
    .hash(this.password, saltRounds)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(error => {
      console.log("Hashing Error.", error);
    });
});

// Check hashed pw with plain text pw
// response = true if valid
userSchema.methods.checkPassword = function(plainTextPW, callBack) {
  bcrypt.compare(plainTextPW, this.password, (error, isMatch) => {
    if (error) {
      return callBack(error);
    } else {
      callBack(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
