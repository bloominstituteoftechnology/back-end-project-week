const express = require('express');
const User = require('../models/usersModel');
const router = express.Router();
const bcrypt = require('bcrypt');

const userCreate = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const newUser = new User({ username, password });
    newUser
      .save()
      .then(savedUser => {
        res.status(200).json({ Success: 'User was successfully created!' });
      })
      .catch(err => {
        res
          .status(500)
          .json({ Error: `There was an error creating the user`, err });
      });
    } else {
      res.status(422).json({ Error: 'Username and Password are required.' });
  }
};

module.exports = userCreate;