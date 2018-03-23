const jwt = require('jsonwebtoken');
const User = require('../users/usersSchema');
const { secret } = require('../config');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(422).json({ err });
      req.decoded = decoded;
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
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(422).json({ err });
      req.decoded = decoded;
      res.status(200).json({ _id: req.decoded.userId });
      next();
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user !== null) {
          user.comparePass(password, (err, match) => {
            if (err) {
              res.send(422).json({ err });
              next();
            }
            if (match) {
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
                .json({ error: 'email or password is not correct' });
              next();
            }
          });
        } else {
          res.status(422).json({ error: 'email or password is not correct' });
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
