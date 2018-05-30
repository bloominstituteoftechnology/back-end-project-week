const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJct = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opt = {};

opt.jwtFromRequest = ExtractJct.fromAuthHeaderAsBearerToken();
opt.secretOrKey = keys.secret;

module.exports = passport => {
  passport.use(new JWTStrategy(opt, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};