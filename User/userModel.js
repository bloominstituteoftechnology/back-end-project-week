const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_ROUNDS = 11;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [{ type: ObjectId; ref: 'Note' }],
  createdOn: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function (next) => {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (plainTextPW, cb) {
  bcrypt.compare(plainTextPW, this.password, (err, match) => {
    if (err) return cb(err);
    cb(null, match);
  });
};

module.exports = mongoose.model('User', userSchema);