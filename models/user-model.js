const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongooseTypes = require('mongoose-types');
const Schema = mongoose.Schema;

mongooseTypes.loadTypes(mongoose, 'email');
const Email = mongoose.SchemaTypes.Email;

const SALT_ROUNDS = 11;

const UserSchema = Schema(
  {
    username: {
      type: Email,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => err);
});

UserSchema.methods.checkPassword = (user, potentialPassword) => {
  return new Promise((resolve, reject) => {
    return bcrypt
      .compare(potentialPassword, user.password)
      .then((isMatch) => {
        resolve(isMatch);
      })
      .catch((err) => reject(err));
  }).catch((err) => err);
};

module.exports = mongoose.model('User', UserSchema);
