const router = require('express').Router();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload(decodedToken);
      if (err) {
        return res
          .status(401)
          .json({
            message: 'you shall not pass! not decoded'
          });
      }

      next();
    });
  } else {
    res.status(401).json({
      message: 'you shall not pass! no token'
    });
  }
}

router.get('/', restricted, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;