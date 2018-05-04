const express = require('express');
const router = require('express').Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const User = require('./userModel');

const greet = function(name) {
  return function(req, res, next) {
    req.hello = `hello ${name}!`;
    next();
  };
};

const protected = function(msg) {
  return function(req, res, next) {
    if (req.session && req.session.name) {
      next();
    } else {
      res.status(401).json({ msg });
    }
  };
};

router.use(express.json());

const path = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';

router.use(
  session({
    name: 'auth',
    secret: 'you shall not pass!!',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    secure: false,
    store: new MongoStore({
      url: path,
      ttl: 10 * 60
    })
  })
);

router.get('/api/users', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send('There are no users yet.');
    });
});

router.get('/api/greet', (req, res) => {
  const { name } = req.session;
  res.send(`hello ${name}`);
});

router.post('/api/register', (req, res) => {
  const { firstName, lastName, email, username, password } = req.body; // This is where new User info exists. Don't ask me why!?!?!

  const user = new User(req.body);

  user
    .save()
    .then(savedUser => res.status(200).json(savedUser))
    .catch(err => res.status(500).json(err));
});

router.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  User.findOne({ username }).then(user => {
    if (user) {
      user.isPasswordValid(password).then(isValid => {
        if (isValid) {
          console.log(user);
          req.session.name = user.username;
          console.log(req.session.name, '==== REQ SESSION NAME ====');
          res.status(200).json({ response: 'Eat a cookie!' });
        } else {
          res.status(401).json({ msg: 'You shall not pass!!!' });
        }
      });
    }
  });
});

router.get('/api/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        res.status(500).json({ msg: 'Could not log you out.' });
      } else {
        res.status(200).json({ msg: 'See you. Come back soon.' });
      }
    });
  }
});

router.get(
  '/api/secret',
  protected('please login before proceeding'),
  checkPass('lambdafriends'),
  (req, res) => {
    console.log(req.session);

    res.send({ greeting: `welcome back ${req.session.name}` });
  }
);

function checkPass(password) {
  return function(req, res, next) {
    if (password === 'lambdafriends') {
      next();
    } else {
      res.send('You shall not pass!');
    }
  };
}

module.exports = router;
