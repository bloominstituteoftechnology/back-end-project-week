const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

const secret = 'These are the voyages of the Starship Enterprise.';

function generateToken(user) {
  const options = {
      expiresIn: 60 * 30,
  }
  const payload = {name: user.username};
  return jwt.sign(payload, secret, options);
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken({username})
      
      // then we assemble a new object and return it
      res.status(201).json({ username, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({username})

  .then(user => {
    if (user) {
      user.validatePassword(password)
        .then(passwordMatch => {
          if (passwordMatch) {
            const { username } = user
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${username}!`, token })
          } else {
            res.status(401).send('invalid credentials')
          }
        })
        .catch(err => {
          res.json({ 'error': err });
        });
    } else {
      res.status(401).send('invalid attempt');
    }
  })
  .catch(err => {
    res.send(err);
  })
})

module.exports = router;
