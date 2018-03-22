const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/config');

const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

const localSignup = new LocalStrategy(localOptions,


)

passport.use(localSignup);