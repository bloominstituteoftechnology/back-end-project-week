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
  timestamps: true
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
  bcrypt.compare(plainTextPW, this.password, function(error, response) {
    if (error) {
      return callBack(error);
    } else {
      callBack(null, response);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
