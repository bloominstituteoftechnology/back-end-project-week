var express = require('express');
var router = express.Router();

const User = require('../models/user');

/* GET users listing. */
const sendUserError = (err, res) => {
  res.status(422);
  if (err && err.message) {
    res.status(500).json({ message: err.message, stack: err.stack });
  } else {
    res.status(500).json({ error: err });
  }
};

router.post('/', function(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('You will need to enter a username & password.', res);
  } else {
    const user = new User({ username, password });
    user.save()
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ error: 'There was a server error while signing up', err });
    });
  }
});

module.exports = router;
