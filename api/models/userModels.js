const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const BCYRPT_COST = 11;

const UserSchema = Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
   },
});

UserSchema.pre('save', function(next) {
   const user = this;
   if (!user.isModified('password')) return next();
   bcrypt.hash(user.password, BCYRPT_COST, function(error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
   });
});

UserSchema.methods.checkPassword = function(plainTextPassword, cb) {
   bcrypt.compare(plainTextPassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
   });
};

module.exports = mongoose.model('User', UserSchema);