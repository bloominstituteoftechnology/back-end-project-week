const User = require('../models/userModels');

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Username/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'Username does not exist in Database' });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        res.status(422).json({ error: 'passwords dont match' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        };
      }
    });
  });
};

module.exports = {
  login
};