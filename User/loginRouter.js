const express = require('express');
const router = express.Router();
const User = require('./User');
// const { makeToken } = require('./auth');
const { restricted, authenticate, makeToken } = require('../secrets/security');

router.post('/', authenticate, (req, res) => {
  // const { username, password } = req.body;
  // if (!username || !password) {
  //   res.status(422).json({ message: 'Username and password is required' });
  // } else {
  //   User.findOne({ username }, (err, user) => {
  //     if (err || user === null)
  //       res.status(422).json({ message: 'first Invalid credentials' });
  //     user.checkPassword(password, (err, valid) => {
  //       if (valid) {
  //         const token = makeToken(user);
  //         console.log(token);
  //         res.json({ token, username: user.username, notes: user.notes });
  //       } else {
  //         res.status(422).json({ message: 'Invalid credentials' });
  //       }
  //     });
  //   });
  // }
  const { _id, username, notes } = req.user;
  const tknUser = { _id, username };
  const token = makeToken(tknUser);
  User.findById(_id)
    .select('-password')
    .populate('notes')
    .then(user => {
      res.json({ token, user });
    });
});

router.get('/', restricted, (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .select('-password')
    .populate('notes')
    .then(user => {
      res.json({ user });
    })
    .catch(err => res.status(501).json(err));
});

module.exports = router;
