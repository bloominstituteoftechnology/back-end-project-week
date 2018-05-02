// Libraries:
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');

const User = require('./users/User');

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    username: user.username,
    iat: timestamp
  };
  const secret = 'no size limit on tokens';
  const options = { expiresIn: '300000' }; // 300,000 milliseconds or 5 minutes
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
        const { _id, username } = user;
        return done(null, { _id, username });
      }
      return done(null, false);
    });
  });
});

passport.use(localStrategy);

const authenticate = passport.authenticate('local', { session: false });

module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
    const credentials = req.body;
    const user = new User(credentials);
    user.save().then(inserted => {
      const token = makeToken(inserted);
      res.status(201).json(token);
    });
  });

  server.post('/api/login', authenticate, (req, res) => {
  res.json({ success: `${req.user.username}, you are logged in!`, token: makeToken(req.user), user: req.user });
  });
}

