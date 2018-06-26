const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('./User.js');
const router = express.Router();
const secret = "toss me, but don't tell the elf!";

router
  .route('/')
  .post((req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ errorMessage: "Please provide username and password." })
        return;
    }
    User.create(req.body)
      .then((user) => {
        // const token = generateToken(user);
        res.status(201).json(user);
        console.log(user);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;