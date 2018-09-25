const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const tokensecret = "your_jwt_secret";
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const notes = require("./routers/notesRouter");
const auth = require("./dbhelpers/auth");

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

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());


app.use(passport.initialize());

app.post("/register", async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ errorMessage: "Invalid body" });
  }
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    await auth.addUser(req.body.username, req.body.password);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    const token = jwt.sign(user.id, tokensecret);
    return res.json({ token });
  })(req, res);
});
app.use('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({message:req.user})
    }
);
app.use("/notes", passport.authenticate('jwt', { session: false }), notes);

app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);
app.listen(port, () => console.log(`Listening on port ${port}!`));
