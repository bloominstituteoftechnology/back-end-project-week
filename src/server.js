const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());

function generateToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    email: user.email,
    _id: user._id,
    iat: timestamp,
  };
  const secret = 'Nothing';
  return (token = jwt.sign(payload, secret, {
    expiresIn: 60 * 60 * 24,
  }));
}

const isLoggedIn = function(req, res, next) {
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
//Routesimplemented but may change or redirected to another file or folder
server.post('/api/users', (req, res) => {
  const { email, password } = req.body;
  const passwordHash = password.trim();
  const user = new User({ email, passwordHash });

  if (!email) {
    return sendUserError('Email is missing', res);
  } else if (!passwordHash) {
    return sendUserError('Password is missing', res);
  }

  user.save((error, user) => {
    if (error) {
      return sendUserError(error, res);
    }
    const token = generateToken(user);
    res.status(200).json(user);
  });
});
//Login
server.post('/api/login', function(req, res, next) {
  const { email, password } = req.body;
  if (email && password.trim()) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          user.isPasswordValid(password).then(isValid => {
            if (isValid) {
              const token = generateToken(user);
              res.json({ user, token });
            } else {
              return sendUserError({ error: 'Incorrect Credentials' }, res);
            }
          });
        }
      })
      .catch(error => {
        return sendUserError(error, res);
      });
  } else {
    return sendUserError(
      { error: 'Email and Password required to login' },
      res
    );
  }
});

//Route showing user is logged in
server.get('/me', isLoggedIn, (peq, res) => {
  res.json(req.user);
});

//logout
server.post('/api/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        res.status(404).json({ error: 'Failed to log out' });
      } else {
        res.status(200).json({ message: 'Logged out Successfully' });
      }
    });
  }
});

module.exports = { server };
