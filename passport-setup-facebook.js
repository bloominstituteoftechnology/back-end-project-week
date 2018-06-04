const passport = require('passport');
const FacebookStrategy = require('passport-facebook')
const keys = require('./keys.js');
const FacebookUser = require('./facebookModel.js')

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })// this function is after creating the user 

// passport.deserializeUser((id, done) => {
//   FacebookUser
//     .findById(id)
//     .then(p => {
//       done(null, p)
//     })
// })


passport.use(new FacebookStrategy({
  callbackURl: "https://localhost:9000/auth/facebook/callback",
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,

}, (accessToken, refreshToken, profile, done) => {
  FacebookUser
    .findOne({ facebookId: profile.id })
    .then(p => {
      if (p) {
        console.log('existing user', p);
        done(null, p)
      }
      else {
        const obj = {
          username: profile.displayName,
          facebookId: profile.id

        }
        const newFacebookUser = new FacebookUser(obj)
        newFacebookUser
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