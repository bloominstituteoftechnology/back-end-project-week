const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJct = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExtractJct.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

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