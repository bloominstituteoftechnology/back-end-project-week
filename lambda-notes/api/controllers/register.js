const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User ({ username, password });
  newUser.save()
    .then(savedUser => {
      res.status(200).json({ success: 'User Saved', savedUser });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error saving user' });
    })
};

module.exports = {
  registerUser
};
