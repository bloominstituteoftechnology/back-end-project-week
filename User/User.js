const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
    lowercase: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
  },
  // security: {
  //   question: {
  //     type: String,
  //     required: true,
  //   },
  //   response: {
  //     type: String,
  //     required: true,
  //   },
  // },
  notes: [{ type: ObjectId, ref: 'Note' }],
});

User.pre('save', function(next) {
  bcrypt.hash(this.password, 12.3, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
    // bcrypt.hash(this.security.response, 12.3, (err, hash) => {
    //   if (err) return next(err);
    //   this.security.response = hash;
    //   next();
    // });
  });
});

User.methods.checkPassword = function(pw, callBack) {
  return bcrypt.compare(pw, this.password, function(err, valid) {
    if (valid) return callBack(null, valid);
    return callBack(err);
  });
};

module.exports = mongoose.model('User', User);
