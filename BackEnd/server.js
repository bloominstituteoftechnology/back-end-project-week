const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/Users.js');
const Notes = require('./models/Notes.js');

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const server = express();
server.use(cors(corsOptions));
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
server.use(
  session({
    secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
    resave: true,
    saveUninitialized: true,
  }),
);

mongoose 
  .connect('mongodb://localhost/backEndProj')
  .then(() => console.log('successfully connected to database'))
  .catch(() => console.log('Connection failed'));



/* ************ MiddleWare ***************** */

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

const loggedIn = (req, res, next) => {
  const { username } = req.session;
  console.log(req.session);
  if (!username) {
    sendUserError('User is not logged in', res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err) {
      sendUserError(err, res);
    } else if (!user) {
      sendUserError('User does exist', res);
    } else {
      req.user = user;
      next();
    }
  });
};


const authenticate = (req, res, next) => {
  const path = req.path;
  if (/restricted/.test(path)) {

    if (!req.session.username) {
      sendUserError('user not authorized', res);
      return;
    }
  }
  next();
};
server.use(authenticate);


/* ************ Routes ***************** */

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    sendUserError('username undefined', res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      sendUserError('No user found at that id', res);
      return;
    }
    const hashedPw = user.password;
    bcrypt
      .compare(password, hashedPw)
      .then((response) => {
        if (!response) throw new Error();
        req.session.username = username;
        req.user = user;
      })
      .then(() => {
        res.json({ success: true, user});
      })
      .catch((error) => {
        return sendUserError('User does not exist at that id ', res);
      });
  });
});

server.post('/register', (req, res) => {
  User.create(req.body)
  .then(user => res.status(200).json(user))
  .catch(err => res.json({ msg:'Could not create User', err}))
});

server.post('/logout', (req, res) => {
  if (!req.session.username) {
    sendUserError('User is not logged in', res);
    return;
  }
  req.session.username = null;
  res.json({ success: true });
});


module.exports = { server };
