const passport = require('passport')

const User = require('../models/userModel')

const configAuth = require('./auth')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.desieralizeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

FacebookStrategy = require('passport-facebook').Strategy;



passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callback: process.env.CALLBACK,
    enableProof: true
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({ '_id': profile.id }, function (err, user) {
        if (err) 
            return done(err);
            if (user) {
                return done(null, user);
            } else {
                const newUser = new User({
                    username = profile.displayName,
                    _id = profile.id,
                    token = profile.token,
                })
                newUser.save(function(err) {
                    if (err) 
                        throw err;
                    return done(null, newUser)
                });
            }
        })
    })
)
}
