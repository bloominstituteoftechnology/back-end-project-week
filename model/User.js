const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minlength:10,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    {
        timestamps: true,
    },
});

User.pre("save", function(next) {
    bcrypt.hash(this.password, 9, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
  
  User.methods.checkPassword = function(plainTextPW, callBack) {
    bcrypt.compare(plainTextPW, this.password, (err, isMatch) => {
      if (err) return callBack(err);
      callBack(null, isMatch);
    });
  };
  
module.exports = User = mongoose.model('users', UserSchema);