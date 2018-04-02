const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT = 11;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  notes: [{type: ObjectId, ref: 'Note'}]
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT, (err, hash) => {
    if (err) return next(error);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(password, callBack) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};



module.exports = mongoose.model('User', UserSchema);
