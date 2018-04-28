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
