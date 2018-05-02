const router = require('express').Router();
const User = require('./userModel');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const Strategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const authenticate = passport.authenticate('local', { session: false });
const protected = passport.authenticate('jwt', { session: false });


const secret = 'HrtkalwJAp873921FJkOpurqvnL';

const localStrategy = new Strategy((username, password, cb) => {
  User.findOne({ username: username }, function (error, user) {
    if (error) { 
      return cb(error);
    }
    if (!user) {
      return cb(null, false);
    }
    if (user) {
      user
        .isPasswordValid(password)
        .then(result => {
          result ? cb(null, user) : cb(null, false);
        })
        .catch(error => {
          return cb(error);
        })
      }
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret, 
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, cb) {
  User
    .findById(payload.sub)
    .select('-password')
    .then(user => {
      user ? cb(null, user) : cb(null, false);
    })
    .catch(error => {
      return cb(error, false);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

router
  .get('/', function(req, res) {
    res.send({ api: 'up and running' })
  });

router
  .post('/register', function(req, res) {
    const credentials = req.body;
    const user = new User(credentials);

    user.save()
        .then(savedUser => {
          const token = makeToken(savedUser);
          res.status(201).json({ token });
        })
        .catch(error => res.status(500).json(console.error('Error registering user', error)));
  });

router
  .post('/login', authenticate, (req, res) => {
    res.json({ token: makeToken(req.user), user: req.user });
  });

router
  .get('/profile', protected, (req, res) => {
    res.json({ user: req.user });
  });

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

module.exports = router;
