const express = require('express');
const router = express.Router();
const User = require('./User');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.statusCode(422).json({ message: 'Username and Password are required' });
  } else {
    const newUser = new User({ username, password });
    newUser
      .save()
      .then(response => {
        res.json({ message: 'User Created!  Please login!' });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
