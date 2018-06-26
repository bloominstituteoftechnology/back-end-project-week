const bcrypt = require('bcrypt');

const hashPassword = function(next) {
  return bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};

const validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};;

module.exports = {
  hashPassword,
  validatePassword
}