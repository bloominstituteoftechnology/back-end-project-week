const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: ObjectId, ref: "Note" }]
});

User.pre("save", function(next) {
  bcrypt.hash(this.password, 10.5).then(hash => {
    this.password = hash;

    next();
  });
});

User.methods.verifyPassword = function(guess, cb) {
  bcrypt.compare(guess, this.password, function(err, isValid) {
    if (err) {
      return cb(err);
    }
    cb(null, isValid);
  });
};

module.exports = mongoose.model("User", User);
