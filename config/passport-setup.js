const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
//require('dotenv').load();

passport.use(
 new GoogleStrategy({
 	callbackURL:'api/users/google/redirect',
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret
 
 },(accessToken, refreshToken, profile, done)=>{
	 console.log(profile)
 
})  
);

