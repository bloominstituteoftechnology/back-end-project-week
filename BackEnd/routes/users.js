const express = require('express');
const User = require('./usersSchema');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { authenticate } = require('../utils/middleware');

const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
  const { email, password, token } = req.body;
  if (token) {
    jwt.verify(token, secret, (err, decrypted) => {
      if (err) res.status(422).json({ err });
      req.decrypted = decrypted;
      res.status(200).json({ _id: req.decrypted.userId });
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user !== null) {
          user.comparePass(password, (err, matching) => {
            if (err) {
              res.send(422).json({ err });
            }
            if (matching) {
              const payload = {
                email: user.email,
                userId: user._id
              };
              res
                .status(200)
                .json({ token: jwt.sign(payload, secret), _id: user._id });
            } else {
              res
                .status(422)
                .json({ err: 'Email/password combination not correct. Please try again.' });
            }
          });
        } else {
          res.status(422).json({ err: 'Email/password combination not correct. Please try again.' });
        }
      })
      .catch(err => {
        res.status(500);
      });
  }
});

userRouter.post('/new', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  if (!email) {
    res.status(422).json({ err: 'Please enter a valid email address' });
  } else if (!password) {
    res.status(422).json({ err: 'Please enter a valid password' });
  } else {
    user
      .save()
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(500).json({ err: 'User not created' });
      });
  }
});

module.exports = userRouter;