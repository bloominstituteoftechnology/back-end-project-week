const express = require('express');
const router = express.Router();
const User = require('./User');
// const { makeToken } = require('./auth');
const { restricted, authenticate, makeToken } = require('../secrets/security');

router.put('/', authenticate, (req, res) => {
  const { _id, username, password } = req.user;
  const tknUser = { _id, username };
  const token = makeToken(tknUser);
  User.findById(_id)
    .select('-password')
    .populate('notes')
    .then(user => {
      res.json({ token, user });
    });
});
