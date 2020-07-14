const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const tokensecret = "your_jwt_secret";
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const auth = require("./dbhelpers/auth");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: tokensecret
    },
    function(jwt_payload, done) {
      return done(null, jwt_payload);
    }
  )
);
passport.use(
  new Strategy(async function(username, password, done) {
    try {
      const results = await auth.getUsername(username);
      const passresults = await bcrypt.compare(password, results[0].password);
      if (results.length === 0) {
        return done(null, false);
      }
      if (!passresults) {
        return done(null, false);
      }
      return done(null, results[0]);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports= passport;
