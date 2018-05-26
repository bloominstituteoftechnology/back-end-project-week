const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../User/User');
const ExtractJwt = require('passport-jwt').ExtractJwt;
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
    expiresIn: 1000 * 60 * 60 * 24, // 24 hour expiration.
  };

  return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) {
  // console.log('local');
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

const jwtStrategy = new JwtStrategy(jwtOptions, function(load, done) {
  // console.log(jwtOptions, 'jwtOptions');
  // console.log(load, 'load');
  User.findById(load.sub)
    .select('-password')
    .then(user => {
      // console.log(load.exp - new Date().getTime());
      if (user && load.exp - new Date().getTime() >= 0) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      console.log(err);
      done(err, false);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authenticate = passport.authenticate('local', { session: false });
const restricted = passport.authenticate('jwt', { session: false });

module.exports = { authenticate, restricted, makeToken };
