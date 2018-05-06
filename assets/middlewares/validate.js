const User = require('../../data/users/UserModel');

//find user and set username to req property user
const validate = function(req, res, next) {
    if (req.session && req.session.username) {
      const username = req.session.username;
      return User
        .findOne({ username: username })
        .then(function(response) {
          req.user = response;
          next();
        }).catch(err => {
          next();
        })
    } else {
      next();
    } 
  };

  module.exports = validate;