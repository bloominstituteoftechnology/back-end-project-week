const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys.js');
const GoogleUser = require('./googleModel.js');
const { makeToken } = require("./makeTokenMWR.js");

passport.serializeUser((user, done) => {
  done(null, user.id)
})// this function is after creating the user 

passport.deserializeUser((id, done) => {
  GoogleUser
    .findById(id)
    .then(p => {
      done(null, p)
    })
})


passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    GoogleUser
      .findOne({ googleId: profile.id })
      .then(p => {
        if (p) {
          console.log('existing user', p);

          done(null, p)
        }
        else {
          const obj = {
            username: profile.displayName,
            googleId: profile.id

          }
          const newGoogleUser = new GoogleUser(obj)
          newGoogleUser
            .save()
            .then(p => {
              console.log('new user:', p);

              don(null, p)
            })
        }

      })

      .catch(err => {
        console.log('err:', err)
      })
  }))
