const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').load();

passport.use(
 new GoogleStrategy({
 	callbackURL:'/api/users/google',
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret
 
 },()=>{
 
})  
)

