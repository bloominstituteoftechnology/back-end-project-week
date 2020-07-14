const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  }
});

UserSchema.pre('save', async function(next) {
  bcrypt
  .hash(this.password, SALT_ROUNDS)
  .then(hash => {
    this.password = hash;
    next();
  })
  .catch(err => {
    return next(err);
  });
});

UserSchema.methods.checkPassword = async function(plainTextPW, callBack) {
  try {
    const match = await bcrypt.compare(plainTextPW, this.password);
    callBack(null, match);
  }
  catch(err) {
    console.log(err);
    callBack(err);
  }
};
//not actually using bcrypt here ... yet...

module.exports = mongoose.model('User', UserSchema);
