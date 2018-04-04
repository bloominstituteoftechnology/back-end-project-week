const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = 'this is a secret message, in uncharted space';

const login = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name.toLowerCase() })
    .then(user => {
      user.checkPassword(password, (nonMatch, hashMatch) => {
        console.log('callback has been reached', nonMatch);
        if (nonMatch !== null || !hashMatch) {
          console.log('nonMatch is not null');
          res.status(422).json({ message: 'Invalid Username and/or Password' });
          return;
        }
        if (hashMatch) {
          const token = jwt.sign({ name: user.name, id: user.id }, secret);
          res.status(200).json({ token, id: user.id, message: `Successfully logged in as ${user.name}.` });
        }
      });
    })
    .catch(err => {
      res.status(422).json({ message: 'Invalid Username and/or Password', err });
    });
};

module.exports = login;
