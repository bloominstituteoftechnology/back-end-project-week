const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    validate: checkPasslength,
    msg: "you gonna get hacked!"
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now()
  },
  notes: [
    {
      type: ObjectId,
      ref: "Note"
    }
  ]
});

function checkPasslength(password) {
  return password.length > 4;
}

UserSchema.pre("save", function(next) {
  return bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => {
      return next(err);
    });
});

UserSchema.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model("User", userSchema);
