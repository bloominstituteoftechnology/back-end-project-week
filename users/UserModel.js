const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../api/config');

const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    notes: [
      {
        type: ObjectId,
        ref: 'Note',
      },
    ],
    tags: [
      {
        type: ObjectId,
        ref: 'Tag',
      },
    ],
    contactInfo: {
      email: {
        type: String,
      },
      phone: {
        type: Number,
      },
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      github: {
        type: String,
      },
      website: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// pre hook
UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.passwordHash, SALT_ROUNDS)
    .then(hash => {
      this.passwordHash = hash;
      next();
    })
    .catch(err => {
      // only show error in production!!
      if (config.env === 'development') {
        return next(err);
      } else {
        return next({ errMessage: 'Encountered an error!!' });
      }
    });
});

UserSchema.pre('update', function(next) {
  bcrypt
    .hash(this.passwordHash, SALT_ROUNDS)
    .then(hash => {
      this.passwordHash = hash;
      next();
    })
    .catch(err => {
      // only show error in production!!
      if (config.env === 'development') {
        return next(err);
      } else {
        return next({ errMessage: 'Encountered an error!!' });
      }
    });
});

UserSchema.methods.checkPassword = function(plainTextPW, callback) {
  // refactor this!!!!!
  bcrypt.compare(plainTextPW, this.passwordHash, function(err, isValid) {
    if (err || isValid === false) {
      return callback(err);
    }

    callback(null, isValid);
  });
};

module.exports = mongoose.model('User', UserSchema);
