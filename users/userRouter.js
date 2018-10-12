const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('./User.js');
const router = express.Router();
const secret = "toss me, but don't tell the elf!";

router
  .route('/')
  .post((req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !validator.isEmail(email)) {
        res.status(400).json({ errorMessage: "Please provide username, password, and valid email address." })
        return;
    }
    User.create(req.body)
      .then((user) => {
        const token = generateToken(user);
        res.status(201).json({ user, token });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              const token = generateToken(user);
              res.status(200).json({ user, token });
            } else {
              res.status(401).send('invalid credentials');
              console.log('bad password');
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
            console.log('error comparing passwords');
          });
      } else {
        res.status(401).send('invalid credentials');
        console.log('no such user');
      }
    })
    .catch(err => {
      res.send(err);
      console.log(err);
    });
});

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { username: user.username };
  return jwt.sign(payload, secret, options);
}

module.exports = router;