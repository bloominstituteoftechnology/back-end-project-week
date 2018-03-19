const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 11;
const secret = require('../config');


const comparePassword = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) console.error(err);
          if (isValid) {
            req.email = user.email;
            next();
          }
        }) 
      } else {
        res.status(404).json({error: 'Incorrect username/passord'});
      }
    })
    .catch(err => {
      res.status(500).json(`There seems to be an error accessing the database.`)
    })
};


const encryptPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({error: 'Must provide email and password'});
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) console.error(err);
      if (hash) {
        user = {
          email,
          password: hash
        }
        req.user = user;
        next();
      }
    });
  }
};

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(422).json(err);
      req.decoded = decoded;
      req.email = decoded.email;
      next();
    })
  } else {
    res.status(403).json({
      error: 'Must provide token in the header'
    })
  }
};

module.exports = {
  comparePassword,
  encryptPassword,
  authenticate
}