const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
const bcrypt = require('bcrypt');

mongooseTypes.loadTypes(mongoose, 'email');

const Schema = mongoose.Schema;
const Email = mongoose.SchemaTypes.Email;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: Email,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: ObjectId,
      ref: 'Note',
    },
  ],
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hashed) => {
    if (err) return next(err);
    this.password = hashed;
    next();
  });
});

UserSchema.methods.checkPassword = function(plainTextPW) {
  return bcrypt.compare(plainTextPW, this.password);
};

module.exports = mongoose.model('User', UserSchema);
