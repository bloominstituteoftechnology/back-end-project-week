const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./User');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const { secret } = require('../secrets/config');

function makeToken(user) {
  // sub: subject (id)
  // iat:
  //return token...

  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.checkPassword(password, (err, valid) => {
      if (err) {
        return done(err);
      }

      if (valid) {
        const { _id, username, notes } = user;
        return done(null, { _id, username, notes });
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
const restricted = passport.authenticate('jwt', { session: false });

module.exports = { authenticate, restricted, makeToken };
