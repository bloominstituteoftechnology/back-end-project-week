const jwt = require('jsonwebtoken');

const User = require('../models/user');
const secret = require('../../config');

const loggedIn = (req, res, next) => {
    console.log('Firing1');
    console.log('REQ', req)
  const token = req.get('Authorization');
  if (token) {
    console.log('Firing2');
    jwt.verify(token, secret, (error, verified) => {
      if (error) {
        console.log('Firing3');
        return res.status(422).json({ message: 'Failed to Verify', error });
        console.log('Firing4');
        req.verified = verified;
      }
      next();
    });
  } else {
    return res.status(403).json({ message: 'No Token Provided on Header' });
  }
};

module.exports = loggedIn;
