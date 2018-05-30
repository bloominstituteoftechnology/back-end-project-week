const express = require("express")
const router = express.Router();

const jwt = require('jsonwebtoken');
const { secret } = require('../../config');
const User = require('../models/userModel');

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Username/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that username in our DB' });
      return;
    }
    user.checkPassword(password, (nonMatch, hashMatch) => {
      // This is an example of using our User.method from our model.
      if (nonMatch !== null) {
        res.status(422).json({ error: 'passwords do not match' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        }; // what will determine our payload.
        const token = jwt.sign(payload, secret); // creates our JWT with a secret and a payload and a hash.
        res.json({ token }); // sends the token back to the client
      }
    });
  });
};

router.route('/')
 .post(login)

module.exports = {
  router
};