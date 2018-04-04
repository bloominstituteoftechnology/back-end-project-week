const express = require('express');
const mongoose = require('mongoose');
const { secret } = require('../config.js');

const morgan = require('morgan');
const session = require('express-session');

const server = express();

server.use(express.json());
server.use(morgan('dev'));

const User = require('../models/user-model.js');

server.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
  })
);

server.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password: password };
  if (!username || !password) {
    res.status(422).json({ error: 'Username and Password required' });
  } else {
    const user = new User(newUser);
    user
      .save()
      .then((response) => {
        req.session.username = response.username;
        req.session.isAuth = true;
        res.status(200).json({ success: "Registered" });
      })
      .catch((err) => res.status(500).json(err));
  }
});

server.post('/login', (req, res) => {
  const UA = req.headers.cookie;
  req.session.UA = UA;
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).json({ error: 'Username and Password required' });
  }
  User.findOne({ username })
    .then((user) => {
      if (user) {
        user.checkPassword(user, password).then((isMatch) => {
          if (isMatch) {
            req.session.username = username;
            req.session.isAuth = true;
            res.status(200).json({ success: 'Logged In.' });
          } else res.status(422).json({ error: 'Wrong Password or Username' });
        });
      } else res.status(422).json({ error: 'Wrong Password or Username' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = server;