const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require(`${__dirname}/User`);
const Note = require(`${__dirname}/Notes`);
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

    //email verification
    // const usernameIsEmail = (username) => {
    //   let usernameValTest = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //   let usernameValid = usernameValTest.test(guess);
    //   if (usernameValid === false) {
    //     return done(err);
    //   } else return 
    // }


    user.verifyPassword(password, function(err, isValid) {
      if (err) {
        return done(err);
      }
      if (isValid) {
        const { _id, username } = user;
        return done(null, { _id, username}); //placed on req.user
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
  server.get("/", function(req,res){ 
    res.json({"whats up": "dude"});
  })

  server.post("/register", function(req, res) {
    const credentials = req.body;
    const user = new User(credentials);
    user
      .save()
      .then(inserted => {
        const token = makeToken(inserted);
        res.status(201).json({ token });
      })
      .catch(err => res.status(500).json({ err: err.message }));
  });

  server.post("/notes", function(req,res) {
    const {body} = req.body;
    const note = new Note({body, userRef: req.user._id});
    note
      .save()
      .then(inserted => {
        console.log(inserted);
        res.json({inserted})
      }).catch((err) => console.log(err.message))
  })

  server.post('/login', authenticate, (req, res) => {
    res.json({ token: makeToken(req.user), user: req.user });
  })
};
