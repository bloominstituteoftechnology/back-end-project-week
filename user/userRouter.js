const express = require('express');
const User = require('./userModel');
const router = require(express.Router());

// user sign-up
router.route('/').post((req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  if (username && password) {
    user
      .save()
      .then(newUser => res.status(201).json(newUser))
      .catch(err => res.status(500).json(err));
  } else res.status(422).json({ Error: 'Enter username and password' });
});

router.route('/login').post((req, res) => {
  const { username, password } = req.body;

  if (username && password) {
  }
});
