const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Rounds = 5;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
}
});

UserSchema.pre('save', function(next) {
   bcrypt.hash(this.password, Rounds, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;

    next();
  })
});