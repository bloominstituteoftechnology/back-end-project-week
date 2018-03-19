const express = require('express');
const User = require('./usersSchema');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('user routes working');
});

userRouter.post('/new', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  if (!email) {
    res.status(422).json({ Error: 'Please include an email' });
  } else if (!password) {
    res.status(422).json({ Error: 'Please include a password' });
  } else {
    user
      .save()
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error creating user' });
      });
  }
});

module.exports = userRouter;
