const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/UserModel');
const config = require('../config');

const secret = config.secret;

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };

  return jwt.sign(payload, secret, options);
}

router.get('/', (req, res) => {
  User.find()
    .populate("notes", "-_id -__v -user")
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/register', function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Username and Password required." });
    return;
  }
  User.create(req.body)
    .then(({ username }) => {
      const token = generateToken({ username });
      res.status(201).json({ username, token });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(user => {
      if (user) {
        user.validatePassword(password)
          .then(isPasswordValid => {
            if (isPasswordValid) {
              const { _id } = user
              const { username } = user
              const token = generateToken(user)
              res.status(200).json({
                message: `welcome ${username}!`,
                token,
                userId: _id
              })
            } else {
              res.status(401).json({ error: 'Invalid username or password.' })
            }
          })
          .catch(err => {
            res.status(500).json({ error: err.message })
          })
      } else {
        res.status(401).json({ error: 'Invalid username or password.' })
      }
    })
})



module.exports = router;