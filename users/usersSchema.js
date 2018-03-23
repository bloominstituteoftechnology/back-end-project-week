const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 11;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  premium: { type: Boolean, default: false }
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS).then(hashedPass => {
    this.password = hashedPass;
    next();
  });
});

userSchema.methods.comparePass = function(plainText, cb) {
  bcrypt.compare(plainText, this.password, (err, isMatch) => {
    if (err) return err;
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
