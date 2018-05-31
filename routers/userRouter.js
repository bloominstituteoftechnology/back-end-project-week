const User = require('../models/userModel');

const userCreate = (req, res) => {
  const { username } = req.body;

  if (username) {
    const newUser = new User({ username });
    newUser
      .save()
      .then(savedUser => {
        res.status(200).json({ Success: 'User was successfully created!' });
      })
      .catch(err => {
        res
          .status(500)
          .json({ Error: `There was an error creating the user`, err });
      });
    } else {
      res.status(422).json({ Error: 'Username is required.' });
  }
};

module.exports = userCreate;