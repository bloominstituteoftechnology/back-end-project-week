const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const passwordLength = 4;
const SALT_ROUNDS = 11;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: checkPasswordLength,
    msg: `Password must be at least ${passwordLength} characters long.`
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})

const checkPasswordLength = password => password.length >= passwordLength

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
        if (err) {
            next(err)
        } 
        this.password = hash;

        next();
    });
});

userSchema.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password)
}

module.exports = mongoose.model('User', userSchema)