const jwt = require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../users/UserModel');

function makeToken(user) {
  // return token
  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
    cohort: user.cohort
  };

  const secret = 'or just a better way to fall';
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

    user.verifyPassword(password, function(err, isValid) {
      if (err) {
        return done(err);
      }

      if (isValid) {
        const { _id, username, cohort } = user;

        return done(null, { _id, username, cohort });
        // placed magcally on req ^^
      }

      return done(null, false);
    });
  });
});

module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
    const credentials = req.body;

    const user = new User(credentials);

    user.save().then(savedUser => {
      const token = makeToken(savedUser);
      res.status(201).json({ token });
    });
  });

  server.post('/api/login', (req, res) => {});
};
