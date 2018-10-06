const passport = require('passport');
const util = require('util');
const GoogleStrategy = require('passport-google-oauth20');
//const GoogleStrategy = require('passport-google').Strategy;
const keys = require('./keys');

passport.use(
 new GoogleStrategy({
 	callbackURL:'/api/users/google',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
 
 },()=>{
 
})  
)

