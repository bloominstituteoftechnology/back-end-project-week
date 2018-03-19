const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongodAuth = require('../../config').mongodAuth;

const bcrypt = require('bcrypt');
const salt = 11;

const { send, message } = require('../helper');

mongoose.connect('mongodb://localhost/notes_db', mongodAuth);
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
  createdOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, salt, (err, hash) => {
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

// UserSchema.methods.checkPassword = function(password, cb) {
//   bcrypt.compare(password)
// };

const User = mongoose.model('User', UserSchema);

module.exports = User;
