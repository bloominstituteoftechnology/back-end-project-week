const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/userRoutes');

const secret = "toss me, but don't tell the elf!";

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = {
    name: user.username,
    race: user.race
  };

  // sign the token
  return jwt.sign(payload, secret, options);
}

// router.get('/user', restricted, (req, res) => {
//   User.find({})
//     .select('username')
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

router.post('/register', function (req, res) {
  User.create(req.body)
    .then(({
      username
    }) => {
      //console.log('username')
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken({
        username
      });
      // then we assemble a new object and return it
      res.status(201).json({
        username
      });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body;

  User.findOne({
      username
    })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              // generate token
              const token = generateToken(user);

              // send token to the client
              res.status(200).json({
                message: `welcome ${username}!`,
                token
              });
            } else {
              res.status(401).send('invalid credentials');
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
          });
      } else {
        res.status(401).send('invalid credentials');
      }
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = router;