const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./userModel.js');

const secret = "I am a secret shh";

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      if (err) {
        return 
        res.status(401)
        res.json({ message: 'invalid token' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'invalid token' });
  }
}

router
.get('/', restricted, (req, res,) => {
  User
  .find()
  .then(users => {
    res.status(200)
    res.json({ users })
  })
  .catch(err => {
    return res.status(500).json({ message: "error" })
  });
});

router
.post('/', (req, res) => {
const { username, password } = req.body;
const newUser = new User({ username, password });

if(!username || !password) {
    res.status(400)
    res.json({ message: "password or username information missing" })
}
else { 
newUser
.save()
.then(savedUser => {
    res.status(200)
    res.json({ savedUser})
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in creating new Note" })
})
}})

module.exports = router;