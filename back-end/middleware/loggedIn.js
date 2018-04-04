const jwt = require('jsonwebtoken');

const User = require('../models/user');
const secret = require('../../config');
const logout = require('./loggedOut');
const BadToken = require('../models/badToken');

const loggedIn = (req, res, next) => {
  const tokenToCheck = req.get('Authorization');
  BadToken.find({ badToken: tokenToCheck })
    .then((token) => {
      if (token.length === 0) {
        console.log('WHAT THE FUCK1')
        jwt.verify(tokenToCheck, secret, (error, decoded) => {
          if (error) {
            return res
              .status(422)
              .json({ message: 'Failed to Verify the Token', error });
          }
          req.decoded = decoded;
          next();
        });
      } else {
        return res.status(200).json({ message: 'User Failed to Log In' });
      }
    })
    .catch((error) => {
      return res.status(200).json({ message: 'User Failed to Log In' });
    });
};

module.exports = loggedIn;
