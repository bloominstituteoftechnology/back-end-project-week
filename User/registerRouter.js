const express = require('express');
const router = express.Router();
const User = require('./User');
const { makeToken } = require('../secrets/security');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.statusCode(422).json({ message: 'Username and Password are required' });
  } else {
    User.findOne({ username }).then(response => {
      if (!response) {
        const newUser = new User({ username, password });
        newUser
          .save()
          .then(response => {
            const token = makeToken(newUser);
            res.json({ token, user: response });
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(444).json({ message: 'Username already exists.' });
      }
    });
  }
});

module.exports = router;
