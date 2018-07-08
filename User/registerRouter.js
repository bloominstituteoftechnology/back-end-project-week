const express = require('express');
const router = express.Router();
const User = require('./User');
const { makeToken } = require('../secrets/security');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const { question, response } = req.body.security;

  if (!username || !password) {
    res.status(422).json({ message: 'Username and Password are required' });
  } else if (!question || !response) {
    res
      .status(422)
      .json({ message: 'Security question and response are required' });
  } else {
    const user = {
      username,
      password,
      security: {
        question,
        response,
      },
    };
    User.findOne({ username }).then(response => {
      if (!response) {
        const newUser = new User(user);
        newUser
          .save()
          .then(response => {
            const token = makeToken(newUser);
            res.json({ token, user: response });
          })
          .catch(err => {
            res.status(500).json({ message: 'Server Error' });
          });
      } else {
        res.status(403).json({ message: 'Username already exists.' });
      }
    });
  }
});

module.exports = router;
