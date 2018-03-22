const passport = require('passport');

exports.localLogin = passport.authenticate('local')

exports.localLoginCallback = passport.authenticate('local')

exports.localCallback = (req, res) => {
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.currentUser = (req, res) => {
  res.send(req.user);
};
// requireLogIn: passport.authenticate('local')

// const requireLogIn = require('../config/passport').requireLogIn;
// const getTokenForUser = require('../config/token');

// const logIn = (req, res) => {
//   res.send({
//     token: getTokenForUser(req.user),
//   });
// };


// logout

// current user

// module.exports = { logIn };