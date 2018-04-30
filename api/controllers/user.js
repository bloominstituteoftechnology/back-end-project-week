const User = require('../models/userModel');
const bcrypt = require('brcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });

  newUser.save((error, user) => {
    if (error) {
      return error;
    }

    res.status(200).json(user);
  });
};

module.exports = { createUser };

//registration
//Username1  => populated notes list1 for that user
//Logout
//Another username2 => a different list2 of notes

//user => user database
//
