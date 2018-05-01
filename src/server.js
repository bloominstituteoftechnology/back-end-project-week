const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const STATUS_USER_ERROR = 422;

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(
  session({
    name: 'auth',
    secret: 'keyboard cat',
    cookie: { maxAge: 6000 },
    secure: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: 'monogodb://localhost/sessions',
      ttl: 10 * 60,
    }),
  })
);

const isLoggedIn = function(req, res, next) {
  if (!req.session.name) {
    sendUserError('Not logged in', res);
  }
  req.user = req.session.name;
  return next();
};

const restricted = (req, res, next) => {
  if (!req.session.name) {
    sendUserError('Not logged in', res);
  }
  req.user = req.session.name;
  return next();
};

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

server.post('users', (req, res) => {
  const { email, password } = req.body;
  const passwordHash = password.trim();
  const newUser = new User({ email, passwordHash });

  if (!email) {
    return sendUserError('Email is missing', res);
  } else if (!passwordHash) {
    return sendUserError('Password is missing', res);
  }

  newUser.save((error, user) => {
    if (error) {
      return sendUserError(error, res);
    }
    res.status(200).json(user);
  });
});
