const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User.js');

const secret = 'Picard-Delta-5';

function restricted(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        req.jwtPayload(decodedToken);
        if (err) {
          return res
            .status(401)
            .json({ message: 'you shall not pass! not decoded' });
        }
        next();
      });
    } else {
      res.status(401).json({ message: 'you shall not pass! no token' });
    }
  }

router
    .get('/', restricted, (req, res) => {
        User
            .find({})
            .select('password')
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => res.status(500).json({ message: err.message }))
    })

    .post('/', restricted, (req, res) => {
        const { username, password } = req.body;
        User
            .create({ username, password })
            .then(response => {
                return res.status(201).json({ message: 'Your account is created.' })
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    })

module.exports = router;