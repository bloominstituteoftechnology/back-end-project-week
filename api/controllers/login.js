const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');
const User = require('../models/userModels');

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'An error occurred. Please contact your administrator' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'No user with that username in our DB' });
      return;
    }
    user.checkPassword(password, (err, hashMatch) => {
      // This is an example of using our User.method from our model.
      if (err) {
        res.status(422).json({ error: 'Password does not match' });
        return;
      }
      if (hashMatch) {
        const payload = {
          username: user.username
        }; // what will determine our payload.
        const token = jwt.sign(payload, mysecret); // creates our JWT with a secret and a payload and a hash.
        res.json({ token }); // sends the token back to the client
      } else {
        res.status(422).json({ error: 'Password does not match' });
      }
    });
  });
};

module.exports = {
  login
};
