const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Note = require('./NoteModel.js'); // eslint-disable-line

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const BCRYPT_COST = 11;

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    required: true,
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  notes: [{ type: ObjectId, ref: 'Note' }]
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
    if (!isMatch) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
module.exports = mongoose.model('User', UserSchema);
