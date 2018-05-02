const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
require('dotenv').config();
const secret = 'no size limit on tokens';

const User = require('../models/user');

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    username: user.username,
    iat: timestamp,
  };
  const options = { expiresIn: '4h' };
  return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) {
      done(err);
    }
    if (!user) {
      done(null, false);
    }
    user.isPasswordValid(password, function(err, isValid) {
      if (err) {
        return done(err);
      }
      if (isValid) {
        const { _id, username } = user;
        return done(null, { _id, username });
      }
      return done(null, false);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .select('-password')
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);
const authenticate = passport.authenticate('local', { session: false });
const protected = passport.authenticate('jwt', { session: false });

module.exports = function(server) {
  server.get('/', (req, res) => {
    res.json({ api: 'up and Running' });
  });

  server.get('/api/test', protected, (req, res) => {
    User.find({})
      .select('-password')
      .then(notes => {
        res.json(notes);
      })
      .catch(err => {
        res.json(err);
      });
  });
  server.post('/api/register', (req, res) => {
    const credentials = req.body;

    const user = new User(credentials);
    user
      .save()
      .then(newUser => {
        const token = makeToken(newUser);
        res.json({ token });
      })
      .catch(err => {
        res.json(err);
      });
  });

  server.post('/api/login', authenticate, (req, res) => {
    res.json({ token: makeToken(req.user), user: req.user });
  });
};
