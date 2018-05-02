const express = require('express');
const User = require('../models/user.js');
const UserRouter = express.Router();

UserRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('Please input a user name or password', res);
    return;
  }

  const user = new User({ username, passwordHash: password });
  user
      .save()
      .then(savedUser => res.status(200).json(savedUser))
      .catch(err => res.status(500).json(err));
});

UserRouter.get('/', (req, res) => {
    User.find({})
        .then((Users) => {
            res.status(200).send(Users);
        })
        .catch((err)=>{
            err.status(500).send({
                error: 'The information could not be retrieved.',
        });
    });
});

module.exports=UserRouter;