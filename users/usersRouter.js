const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');

const secret = "toss me, but don't tell the elf!";

router.get('/', restricted, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json( users );
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
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

module.exports = router;