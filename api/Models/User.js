const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_ROUNDS = 11;

const UserSchema = new mongoose.Schema({
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

  notes: [{ type: ObjectId, ref: 'Note' }],
});

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      console.log('ERROR hashing password: ', err);
      next(err);
    });
});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
  bcrypt.compare(plainTextPW, this.password, function(err, isValid) {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, isValid);
  });
};

module.exports = mongoose.model('User', UserSchema);
