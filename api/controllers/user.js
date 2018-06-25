const User = require('../models/UserModels');

const createUser = (req, res) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then(({ username }) => {
      res.status(201).json({username})
    })
    .catch(err => {
      res.status(500).json({error: "error creating User", err: err.message})
    });
};

module.exports = {
  createUser
}