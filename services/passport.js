const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    //find a record of a user with the key of googleId and the value of profile id
    User.findOne({
        googleId: profile.id
    }).then(existingUser => {
        if (existingUser) {
            //if the record already exists we are done and can go back to the auth flow
            done(null, existingUser);
        } else {
            //if we don't have a record then create and save a new user in the database
              //create record of this model instance
            new User({
                googleId: profile.id
            }).save()
            .then(user => done(null, user));
        }
    })
  

}));