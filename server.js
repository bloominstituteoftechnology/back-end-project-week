const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const User = require('./user');

const server = express();

server.use(bodyParser.json());
server.use(session({
  secret: 'dumbledore dies'
}));

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

mongoose
  .connect('mongodb://test:test@ds163689.mlab.com:63689/backenddb')
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('error connecting to mongo', err));

const authenticate = function (req, res, next) {
  if (req.session.name) {
    User.findOne({ username: req.session.name }).then((user) => { req.user = user; next(); })
        .catch(err => sendUserError({ message: 'You done fucked up.' }, res));
  } else { sendUserError({ message: 'You done fucked up.' }, res); }
};

server.use(express.json());

server.get('/', authenticate, (req, res) => {
  res.status(200).json({ api: "I'M SERVER RICK!!!!!!!!!!!" });
  User.find().then(users => res.json(users));
});

server.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});

server.post('/log-in', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username })
      .then((users) => {
        console.log(users);
        users.isPasswordValid(password).then((Response) => {
          if (Response) {
            req.session.name = users.username;
            res.status(200).json({ success: true });
          } else { sendUserError({ message: 'You done fucked up.' }, res); }
        });
      })
      .catch(err => sendUserError(err, res));
  } else { sendUserError({ message: 'You done fucked up.' }, res); }
});

server.post('/users', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('Please input a user name or password', res);
    return;
  }

  const user = new User({ username, passwordHash: password });
  user
      .save()
      .then(savedUser => res.status(200).json(savedUser))
      .catch(err => res.status(500).json(err));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});