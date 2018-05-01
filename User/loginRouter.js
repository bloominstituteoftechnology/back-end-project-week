const express = require('express');
const router = express.Router();
const User = require('./User');
const { makeToken } = require('./auth');
const { authenticate } = require('./security');

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
  console.log(req.user);
  const { _id, username, notes } = req.user;
  const user = { id: _id, username };
  const token = makeToken(user);
  res.json({ token, user: req.user });
});

module.exports = router;
