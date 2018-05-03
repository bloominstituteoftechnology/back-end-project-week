const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
email:{
    type: String,
    
    required: true
},
password:{
    type: String,
    required: true,
    lowercase: true

}

})
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 12, (err, hash) => {
      if (err) {
        return next(err);
      }
  
      this.password = hash;
      return next();
    });
  });
  UserSchema.methods.isPasswordValid = function (passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
  };
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;