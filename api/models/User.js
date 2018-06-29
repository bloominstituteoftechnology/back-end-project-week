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
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
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
        return /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%&]).{8,})\S$/.test(
          val
        );
      },
      message:
        'Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character: !, @, #, $, %, &'
    }
  }
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  });
});

userSchema.pre('findOneAndUpdate', function(next) {
  bcrypt.hash(this._update.password, 12, (err, hash) => {
    if (err) next(err);
    this._update.password = hash;
    next();
  });
});

userSchema.pre('findOneAndRemove', function (next) {
  const userId = this._conditions._id;

  // before deleting a user
  // - find all projects user is an admin for and delete them
  // - find all projects user is a member of and remove user
  // - find all tasks assiged to user and remove them as assignee
});

userSchema.methods.isValidPassword = function(password, cb) {
  return bcrypt.compare(password, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);
