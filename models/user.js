const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  } 
});

userSchema.pre('save', function(next) {
  return bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;                      
      return next();
    })
    .catch(err => next(err)); 
});

userSchema.methods.verifyPassword =  function(inputtedPassword) {
  return bcrypt.compare(inputtedPassword, this.password);
}; 

module.exports = mongoose.model('User', userSchema);

