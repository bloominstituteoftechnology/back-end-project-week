const User = require('../models/userModel');

const createUser = (req, res) => {
  const { name, password } = req.body;
  const newUser = new User({ name: name.toLowerCase(), password });
  newUser
    .save()
    .then(user => {
      console.log('I got to then');
      res.status(200).json({ message: 'User successfully created.'});
    })
    .catch(err => {
      console.log('I got to catch');
      res.status(422).json({ message: 'User could not be created because of an error', err});
    });
};

module.exports = createUser;
