const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const Note = require('../notes/model');

// const mongodAuth = require('../../config').mongodAuth;
// const { mLabUser, mLabPass, mLabUri } = require('../../config').mLab;
const { mLabUser, mLabPass, mLabUri } = JSON.parse(process.env.CONFIG).mLab;
const secret = JSON.parse(process.env.CONFIG).secret;

// const secret = require('../../config').secret;

const bcrypt = require('bcrypt');
const salt = 11;

const { send, message } = require('../helper');

mongoose.connect(`mongodb://${mLabUser}:${mLabPass}@${mLabUri}`);

// mongoose.connect('mongodb://localhost/notes_db', mongodAuth);
// mongoose.connect('mongodb://localhost/notes_db');

const UserSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{ type: ObjectId, ref: 'Note' }],
  createdOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password + secret, salt, (err, hash) => {
    if (err) {
      send(res, error.server, hashingError, err);
      return;
    }

    this.password = hash;
    next();
  });
});

// UserSchema.pre('update', function(next) {
//   bcrypt.hash(this.password, salt, (err, hash) => {
//     if (err) {
//       send(res, error.server, hashingError, err);
//       return;
//     }

//     this.findOne({ key: this._id }, function(err, doc) {
//       if (err) {
//         send(res, error.server, hashingError, err);
//         return;
//       }

//       this.update({}, { $set: { password: hash } });
//     });

//     next();
//   });
// });

UserSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password + secret, this.password, (isValid, err) => {
    err ? cb(err) : cb(isValid);
  });
};

UserSchema.statics.getAllUsers = cb => {
  User.find({}, (err, users) => {
    if (err) {
      cb({ err: err });
      return;
    }

    cb(users);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
