const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').load();

passport.use(
 new GoogleStrategy({
 	callbackURL:'/google/redirect',
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret
 
 },(accessToken, refreshToken, profile, done)=>{
	 console.log(profile)
 
})  
)

