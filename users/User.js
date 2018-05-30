const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
    {
      type: ObjectId,
      ref: "Note"
    }
  ]
});

UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

UserSchema.statics.authenticate = function(user, password, callback) {
  User.findOne({ username: user }).exec(function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

UserSchema.methods.addNote = function(note_id) {
  this.notes.push(note_id);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
