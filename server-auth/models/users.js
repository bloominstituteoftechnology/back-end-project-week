const mongoose = 'mongoose';
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(input, cb) {
  bcrypt.compare(input, this.password, (err, isCorrect) => {
    if (err) return cb(err);
    cb(null, isCorrect);
  });
};

module.exports = mongoose.model('User', UserSchema);
