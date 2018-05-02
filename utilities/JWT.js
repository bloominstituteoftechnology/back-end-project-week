const User = require("../users/userModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const secret = "unicorns are amazing";

function makeToken(user) {
  const timestamp = new Date().getTime();

  const payload = {
    sub: user._id.toString(),
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: "10 seconds"
  };
  return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) {
      done(err);
    }
    if (!user) {
      done(null, false);
    }
    user.verifyPassword(password, function(err, isValid) {
      if (err) {
        return done(err);
      }
      if (isValid) {
        return done(null, user);
      }
      return done(null, false);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authenticate = passport.authenticate("local", {
  session: false,
  failureFlash: true
});
function protected() {
  return (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, payload, info) => {
      if (err || info) {
        return next(new Error("Token is wrong or nonexistent, bro."));
      } else {
        next();
      }
    })(req, res, next);
  };
}

module.exports = { makeToken, authenticate, protected };
