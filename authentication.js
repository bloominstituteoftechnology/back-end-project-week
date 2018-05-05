const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./User/userModel');
const JWT = require('jsonwebtoken');
const { ExtractJwt, Strategy } = require('passport-jwt')

const secret = {
  database: 'mongodb://lambdanotes1:lambdanotes1@ds261429.mlab.com:61429/lambda-notes',
  secret: 'middleFingerEmoji',
  salt: 'iJustWantToSeeTheWorldBurn'
};

function tokenize(user) {
  const time = new Date().getTime();
  const options = { expiresIn: '20m' };
  const secret = {
    database: 'mongodb://lambdanotes1:lambdanotes1@ds261429.mlab.com:61429/lambda-notes',
    secret: 'middleFingerEmoji',
    salt: 'iJustWantToSeeTheWorldBurn'
  };
  const payload = {
    username: user.username,
    sub: user._id,
    iat: timestamp
  };

  return JWT.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.checkPassword(password, (err, validPW) => {
      if (err) return done(err);

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

const jwtStrategy = new Strategy(jwtOptions, function (load, done) {
  User
    .findById(load.sub)
    .select('-password')
    .then(user => {
      console.log(user);
      user ? done(null, user) : done(null, false);
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

module.exports = { authenticate, restricted, tokenize };