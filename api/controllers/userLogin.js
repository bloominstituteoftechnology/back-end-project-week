const User = require('../models/userModel');

const userLogin = (req, res) => {
  const { username, password } = req.body;
  const lowercaseUsername = username.toLowerCase();
  User.findOne({ username: lowercaseUsername })
    .then(user => {
      if (user) {
        user
          .checkPassword(password)
          .then(verified => {
            if (verified) {
              req.session.username = user.username;
              res.send(user._id);
            } else res.status(401).json({ error: "passwords don't match" });
          })
          .catch(err => {
            res.json({ errorCheckingPassword: err });
          });
      } else
        res.status(401).json({ error: 'No user with that username in our DB' });
    })
    .catch(err => {
      res.status(403).json({ error: 'Invalid Username/Password', ...err });
    });
};

module.exports = {
  userLogin,
};