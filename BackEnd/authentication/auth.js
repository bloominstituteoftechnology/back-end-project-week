const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secret } = require('../config');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (err, decrypted) => {
      if (err) res.status(422).json({ err });
      req.decrypted = decrypted;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const login = (req, res, next) => {
  const { email, password, token } = req.body;
  console.log(token);
  if (token) {
    jwt.verify(token, secret, (err, decrypted) => {
      if (err) res.status(422).json({ err });
      req.decrypted = decrypted;
      res.status(200).json({ _id: req.decrypted.userId });
      next();
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user !== null) {
          user.comparePass(password, (err, matching) => {
            if (err) {
              res.send(422).json({ err });
              next();
            }
            if (matching) {
              const payload = {
                email: user.email,
                userId: user._id
              };
              res
                .status(200)
                .json({ token: jwt.sign(payload, secret), _id: user._id });
              next();
            } else {
              res
                .status(422)
                .json({ err: 'Please enter a correct email/password combination' });
              next();
            }
          });
        } else {
          res.status(422).json({ err: 'Please enter a correct email/password combination' });
          next();
        }
      })
      .catch(err => {
        res.status(500);
        next();
      });
  }
};

module.exports = {
  authenticate,
  login
};