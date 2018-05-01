const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./User");
const secret = "backend app secret";

const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;

function makeToken(user) {
  //retun a token
  //sub (subject) (id)
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = { expiresIn: "4h" };
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
        const { _id, username, race } = user;
        return done(null, { _id, username, race }); //placed on req.user
      }
      return done(null, false);
    });
  });
});

const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .select("username")
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

const authenticate = passport.authenticate("local", { session: false });
const protected = passport.authenticate("jwt", { session: false });

module.exports = function(server) {
  server.post("https://frozen-hamlet-56840.herokuapp.com", function(req, res) {
      const credentials = req.body;
      const user = new User(credentials);
      user
        .save()
        .then(inserted => {
          const token = makeToken(inserted);
          res.status(201).json({ token });
        })
        .catch(err => res.status(500).json({ err: "username taken" }));
  });
};
