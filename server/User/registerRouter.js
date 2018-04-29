const express = require('express');
const router = express.Router();
const User = require('./User');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.statusCode(422).json({ message: 'Username and Password are required' });
  } else {
    const newUser = new User({ username, password });
    newUser.save().then(response => {
      console.log(response);
      res.json({ message: 'User Created!  Please login!' });
    });
  }
});

module.exports = router;
