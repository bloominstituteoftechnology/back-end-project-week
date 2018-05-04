const express = require('express');

const User = require('../models/user.js');

const UserRouter = express.Router();

UserRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).send({
      errorMessage: 'Please provide both username and password for the User.',
    });

  const user = new User({ username, password });

  user
    .save()
    .then(savedUser => {
      console.log(user);
      res.status(201).send(savedUser);
    })
    .catch(err => {
      res.status(500).send({
        error: 'There was an error while saving the User to the Database',
      });
    });
});

UserRouter.post('/login', (req, res) => {
  // res.json({ token: makeToken(req.user), user: req.user });
  const { username, password } = req.body;
  const user = req.body;
  console.log(user);
  res.json(user);

  // res.status(201).send(savedUser);
});

UserRouter.get('/', function(req, res) {
  User.find({})
    .then(Users => {
      res.status(200).send(Users);
    })
    .catch(err => {
      res.status(500).send({
        error: 'The information could not be retrieved.',
      });
    });
});

module.exports = UserRouter;