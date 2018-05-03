const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const SALT_ROUNDS = 2;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    // https://github.com/kelektiv/node.bcrypt.js#usage
    // Fill this middleware in with the Proper password encrypting, bcrypt.hash()
    // if there is an error here you'll need to handle it by calling next(err);
    // Once the password is encrypted, call next() so that your userController and create a user
    console.log('pre');
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if(err){
      next(err)
      }
    else{
    this.password = hash;
    next();
      }
    })
  });
  
    
  
  UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
    // https://github.com/kelektiv/node.bcrypt.js#usage
    // Fill this method in with the Proper password comparing, bcrypt.compare()
    // Your controller will be responsible for sending the information here for password comparison
    // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
    bcrypt.compare(plainTextPW, this.password, (function(err, valid) {
      if(err){
        return callBack(err)
      }
  
      callBack(null, valid)
    }))
  };
  

UserSchema.methods.checkUser = function() {
    return this.username;
}

UserSchema.methods.checkPassword = function() {
    return this.password;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
