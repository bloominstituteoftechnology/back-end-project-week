const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    console.log(hash);
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}



module.exports = mongoose.model('User', UserSchema);