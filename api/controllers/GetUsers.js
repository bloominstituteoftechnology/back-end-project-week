const User = require('../models/UserModel');

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(422).json({ error: 'There was an error!' });
    });
};

module.exports = {
  getUsers
};