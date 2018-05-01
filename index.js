//dependencies
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const chalkAnimation = require('chalk-animation');

//initialize the server
const server = express();

//connect mongo database


//middleware
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken) => {
  console.log(accessToken);
}));


//next();



//routes

server.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
})
);



//dynamic port binding
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  chalkAnimation.rainbow(`The server is running on port ${PORT}`);
});
