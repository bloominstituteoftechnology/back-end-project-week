const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const mongoose = require('mongoose');

const User = require('./model');

const server = express();

server.use(helmet());
server.use(express.json());

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n===API running on http://localhost:${port}===\n`)
);

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

server.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = new User(req.body);
  if (!username || !password) {
    res.status(422).json({ error: 'Please provide a username and password.' });
  } else {
    user
      .save()
      .then(savedUser => res.status(200).json(savedUser))
      .catch(err => sendUserError(err, res));
  }
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username })
      .then(user => {
        user.isPassWordValid(password).then(response => {
          if (response) {
            req.session.name = user.username;
            res.status(200).json({ success: true });
          } else {
            sendUserError({ message: 'Username and password are invalid.' });
          }
        });
      })
      .catch(err =>
        res.status(500).json({ errorMessage: 'There was an error logging in.' })
      );
  } else {
    sendUserError({ message: 'Please provide username and password.' }, res);
  }
});

module.exports = { server };
