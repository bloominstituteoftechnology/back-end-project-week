const User = require('../models/userModel');

const createUser = (res, req) => {
  const { name, password } = req.body;
  const newUser = new User({ name, password });
  newUser
    .save()
    .then(user => {
      res.status(200).json({ message: 'User successfully created.'});
    })
    .catch(err => {
      res.status(422).json({ message: 'User could not be created because of an error', err});
    });
};

module.exports = createUser;
