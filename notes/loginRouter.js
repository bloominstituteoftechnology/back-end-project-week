const express = require('express');
const jwt = require('jsonwebtoken');
const mysecret = 'thisisasecret';
const User = require('./userModels');
const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
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
      
      if (nonMatch !== null) {
        res.status(422).json({ error: 'passwords dont match' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        }; // what will determine our payload.
        const token = jwt.sign(payload, mysecret); // creates our JWT with a secret and a payload and a hash.
        res.json({ token }); // sends the token back to the client
      }
    });
  });
});

module.exports = loginRouter;
