/* eslint-disable */
const express = require('express'),
      server = express(),
      config = require('./config/config'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      router = require('./routes');
// TODO ADD cors package
// const corsOptions = {
//   origin: 'http://localhost:3333',
//   credentials: true
// };
// morgan...if needed

// db connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

server.get('/', (req, res) => res.json({ message: 'render home page on the front-end'}))

server.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});

server.use(express.json());
router(server);

// PASSPORT
server.use(passport.initialize());
// for persistent login sessions
server.use(passport.session());

server.get('/success', (req, res) => res.json({ message: `Welcome ${req.query.username}`}));
server.get('/error', (req, res) => res.json({ error: 'login error'}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// LOCAL AUTH
const LocalStrategy = require('passport-local').Strategy;
const localOptions = { usernameField: 'email' };

passport.use(new LocalStrategy(localOptions, (email, password, done) => {
  // look for user
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { error: 'Login details could not be verified. Please try again.' });
    // user has been located...now verify password
    user.comparePassword(password, (error, isMatch) => {
      if (error) return done(error);
      if (!isMatch) return done(null, false, { error: 'Login details could not be verified. Please try again.' })

      return done(null, user);
    });
  });
}));

server.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
});
