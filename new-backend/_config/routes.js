const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../users/User");
const mySecret = "Flint still doesnt have clean water";

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username })
    .then(user => {
      if (!user) {
        done(null, false);
      } else {
        user
          .validatePassword(password)
          .then(isValid => {
            const { _id, username } = user;
            return done(null, { _id, username });
          })
          .catch(err => {
            return done(err);
          });
      }
    })
    .catch(err => done(err));
});

passport.use(localStorage);

const authenticate = passport.authenticate("local", { sessions: false });

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  return jwt.sign(payload, mySecret, options);
}

module.exports = function(server) {
  server.get("/", (req, res) => {
    res.json({ message: "all good homie" });
  });

  server.post("/register", function(req, res) {
    User.create(req.body)
      .then(user => {
        const token = makeToken(user);
        res.status(201).json({ user, token });
      })
      .catch(err => res.status(500).json(err));
  });

  server.post("/login", authenticate, (req, res) => {
    res.status(200).json({ token: makeToken(req.user), user: req.user });
  });
};
