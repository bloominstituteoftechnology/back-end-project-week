const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: process.env.PASSPORT_GOOGLE_ID,
      clientSecret: process.env.PASSPORT_GOOGLE_SECRET,
    },
    () => {}
  )
);
