const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const initPassport = require('./passport');

const options = {};

const init = (passport, db) => {
  initPassport(passport, db);

  passport.use(
    new LocalStrategy(options, (username, password, done) => {
      db('users')
        .where('username', '=', username)
        .first()
        .then(async (user) => {
          if (!user) {
            return done(null, false);
          }

          const match = await bcrypt.compare(password, user.password)
          if (!match) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    }),
  );
};

module.exports = init;
