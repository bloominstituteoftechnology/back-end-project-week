const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { mySecret } = require('../config');

const User = require('../models/userModel');

const logIn = function(req, res, next) {
  if (!req.username) {
    return res.status(403).send({ message: 'You must supply a username' });
  }
  const payload = { username: req.username };
  const token = jwt.sign(payload, mySecret);
  res.send({ token });
}

const registration = function(req, res) {
  const user = new User(req.user);

  user 
    .save()
    .then(newUser => {
      res.status(200).send(newUser);
    }).catch(err => {
      res.status(500).send({ error: 'Failed to save new user', errorMessage: err });
    });
};

module.exports = {
  logIn,
  registration
}