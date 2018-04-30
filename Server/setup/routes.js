const jwt = require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const { ExtractJwt } = require('passport-jwt'); //use this to teach passport how to get jwt
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../users/User');
const secret = 'no size limit on tokens';

function makeToken(user) {
  //return token
  // sub: subject (id)
  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
    race: user.race
  };

  const options = {
    expiresIn: '4h'
  };

  return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) {
  // find user
  User.findOne({ username }, function(err, user) {
    if (err) done(err);

    //no error
    if (!user) {
      done(null, false);
    }

    user.verifyPassword(password, function(err, isValid) {
      if (err) return done(err);

      if (isValid) {
        const { _id, username, race } = user;
        return done(null, { _id, username, race }); //placed on req
      }

      return done(null, false);
    });
  });
  //verify password with what is stored
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .select('-password') //removes password from user before sending
    .then(user => {
      //can check here if user.active or user.admin
      if (user) {
        done(null, user); //no error = null; send back full user or filter if desired
      } else {
        done(null, false); //token valid but user is no longer in database
      }
    })
    .catch(err => done(err, false));
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authenticate = passport.authenticate('local', { session: false });
const protected = passport.authenticate('jwt', { session: false });

module.exports = function(server) {
  server.get('/api/hobbits', protected, (req, res) => {
    User.find({ race: 'hobbit' })
      .select('-password')
      .then(hobbits => {
        res.status(202).json(hobbits);
      })
      .catch(err => res.status(500).json(err));
  });

  //sanity check route
  server.get('/', (req, res) => {
    res.send({ api: 'Up and running' });
  });

  //create a new user
  server.post('/api/register', (req, res) => {
    const credentials = req.body;

    // add a pre ('save') hook to the User schema
    //that will hash the password before persisting
    //the user to the database
    const user = new User(credentials);

    //save
    user.save().then(insertedUser => {
      const token = makeToken(insertedUser);

      res.status(201).json({ token });
    });
  });

  server.post('/api/login', authenticate, (req, res) => {
    res.json({ token: makeToken(req.user), user: req.user });
  });
};
