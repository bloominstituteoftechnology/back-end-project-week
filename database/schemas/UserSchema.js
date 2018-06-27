const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // email: { type: String, required: true, unique: true }
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

User.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err)
      return next(err);
    
    this.password = hash;
    next();
  });
});

// custom model method
User.statics.verifyPassword = function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password)
    .then(bool => {
      return bool;
    })
    .catch(err => {
      console.log(err);
    })
};

module.exports = User;