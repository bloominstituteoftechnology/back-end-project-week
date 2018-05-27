const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });

  // newUser.save((error, user) => {
  //   if (error) {
  //     return error;
  //   }

  //   res.status(200).json(user);
  // });
  newUser
    .save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => console.log('error creating user'));
};

module.exports = { createUser };

//registration
//Username1  => populated notes displayNotes1 for that user
//Logout
//Another username2 => a different displayNotes2 of notes

//user => user database
//
