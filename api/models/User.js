const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name required']
  },
  email: {
    type: String,
    required: [true, 'Email address required'],
    unique: true,
    validate: {
      validator: val => {
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
          val
        );
      },
      message: '{VALUE} is not a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: val => {
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(
          val
        );
      },
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &'
    }
  }
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  })
});

userSchema.methods.isValidPassword = function(password){
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
