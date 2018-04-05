const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const newToken = require('../controllers/newToken');
const server = express();

server.use(express.json());
server.use(morgan('dev'));

const User = require('../models/user-model.js');

server.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password: password };
  if (!username || !password) {
    res.status(422).json({ error: 'Username and Password required' });
  } else {
    const user = new User(newUser);
    user
      .save()
      .then((user) => {
        let userInfo = {
            _id: user._id,
            username: user.username,
          };
          const token = newToken(userInfo);
        res.status(200).json({
          token,
          user: userInfo,
        });
      })
      .catch((err) => res.status(500).json(err));
  }
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ error: 'Username and Password required' });
  }
  User.findOne({ username }).select('username _id')
    .then((user) => {
      if (user) {
        user.checkPassword(user, password)
        .then((isMatch) => {
          if (isMatch) {
            let userInfo = user.toObject();
            const token = newToken(userInfo);
            res.status(200).json({
              token,
              user: userInfo,
            });
          } else res.status(422).json({ error: 'Wrong Password or Username' });
        });
      } else res.status(422).json({ error: 'Wrong Password or Username' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = server;
