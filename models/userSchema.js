const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
mongooseTypes.loadTypes(mongoose, 'email');

const Schema = mongoose.Schema;
const Email = mongoose.SchemaTypes.Email;
const ObjectId = mongoose.Schema.Types.ObjectId;
const SALT_ROUNDS = 11;

const userSchema = Schema({
  username: {
    type: Email,
    unique: true,
    required: true,
  },
  hashpassword: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: ObjectId,
      ref: 'noteSchema',
    },
  ],
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.hashpassword, SALT_ROUNDS, (err, password) => {
    if (err) return next(err);
    this.hashpassword = password;
    next();
  });
});

userSchema.methods.checkPassword = function (plainTextPW) {
  return bcrypt.compare(plainTextPW, this.hashpassword)
};

mongoose.connect('mongodb://localhost/userSchema');


module.exports = mongoose.model('userSchema', userSchema);