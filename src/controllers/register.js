const User = require('../users/User.js');
const bcrypt = require('bcrypt');

const register = (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  user
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ error: 'status code 500' });
    });
};

module.exports = { register };
