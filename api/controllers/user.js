const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new { username, password };
     newUser.save()
        .then(savedUser => res.status(200).json(savedUser))
        .catch(err => res.status(500).json(err));
};

module.exports = {
  createUser
};
