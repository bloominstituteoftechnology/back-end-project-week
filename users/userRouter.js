const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('./userModel');

const secret = "wubba lubba dub dub"

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

router.get('/',restricted, (req, res) => {  
    res.status(201).json("yaya")
//   User.find({})
//     .select('-password')
//     .then(users => {
//       console.log(users)
//       res.json(users);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
});

module.exports = router;
