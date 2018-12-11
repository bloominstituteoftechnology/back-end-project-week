const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require("../_secrets/keys.js").facebookAuth;
// passport set up
server.use(passport.initialize());
server.use(passport.session());

server.get('/success', (req, res) => res.send("You have successfully logged in"));
server.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// facebook auth set up
passport.use(new FacebookStrategy({
    clientID: configAuth.clientID,
    clientSecret: configAuth.clientSecret,
    callbackURL: configAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, cb) {
    db("users")
        .insert({name: profile.displayName})
        .then({function(res) {
        console.log(res);
    }})
        .catch(err => console.log(err))
    return cb(null, profile);
    }   
));

server.get('/auth/facebook',
  passport.authenticate('facebook'));

server.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });