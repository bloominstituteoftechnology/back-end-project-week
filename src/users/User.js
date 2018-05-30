const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if(err) next(err);
    
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(enteredPsw, cb) {
  bcrypt.compare(enteredPsw, this.password, (err, matched) => {
    if(err) cb(err);
    
    cb(null, matched);
  });
};

module.exports = mongoose.model('Note', NoteSchema);