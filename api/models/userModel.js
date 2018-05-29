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
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // Fill this method in with the Proper password comparing, bcrypt.compare()
  // Your controller will be responsible for sending the information here for password comparison
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  try {
    const match = await bcrypt.compare(plainTextPW, this.password);
    callBack(null, match);
  }
  catch(err) {
    console.log(err);
    callBack(err);
  }
};


module.exports = mongoose.model('User', UserSchema);
