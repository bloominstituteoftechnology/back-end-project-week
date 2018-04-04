const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [{ type: ObjectId, ref: 'Note' }],
});

//=========================================
//            Pre-Save Hooks
//=========================================

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => err);
});

UserSchema.methods.checkPassword = function(password, callBack) {
  bcrypt
    .compare(password, this.password, (err, validated) => {
      if (err) return callBack(err);
      callBack(null, validated);
    });
};

//=========================================
//            Test Functions
//=========================================

UserSchema.methods.getUsername = function() {
  return this.username;
};

module.exports = mongoose.model('User', UserSchema);
