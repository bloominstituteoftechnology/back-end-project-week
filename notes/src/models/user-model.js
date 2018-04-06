const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const BCRYPT_COST = 11;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
  const user = this;
  if(!user.isModified('password')) return next();
  bcrypt.hash(user.password, BCRYPT_COST, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function (potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
