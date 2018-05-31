const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
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

module.exports = mongoose.model("User", userSchema);
