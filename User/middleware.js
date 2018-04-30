const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./User');

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

passport.use(localStorage);
