const User = require('../models/userModel');

const createUser = (req, res) => {
  const { name, password } = req.body;
  if(name && password) {
    const newUser = new User({ name: name.toLowerCase(), password });
    newUser
      .save()
      .then(user => {
        res.status(200).json({ message: 'User successfully created.'});
      })
      .catch(err => {
        res.status(422).json({ message: 'Unsuccesful: There was an error creating new User', err});
      });
  } else {
    res.status(422).json({ message: 'Name & Password required.'});
  }
};

module.exports = createUser;