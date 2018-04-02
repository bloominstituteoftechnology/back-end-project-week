const User = require('../models/userModel');

const userCreate = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .save()
    .then(newUser => {
      res.status(201).send(newUser);
    })
    .catch(err => {
      res.status(400).send({ err });
    });
};

module.exports = {
  userCreate,
};