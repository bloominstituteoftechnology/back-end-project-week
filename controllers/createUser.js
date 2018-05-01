const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(422)
      .json({ error: 'A valid username and password is required' });
  } else {
    const newUser = new User({ username, password });
    newUser
      .save()
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

module.exports = { createUser };
