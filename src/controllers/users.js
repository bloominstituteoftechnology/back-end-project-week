const User = require('../users/User.js');

const users = (req, res) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = { users };
