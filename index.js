const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const notes = require("./routers/notesRouter");
const auth = require("./dbhelpers/auth");
const passport = require("./passport")

const tokensecret = "your_jwt_secret";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());



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
    console.log(err);
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
   async function(req, res) {
   const results= await auth.get();

        res.json({results})
    }
);
app.use("/notes", passport.authenticate('jwt', { session: false }), notes);

app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);
app.listen(port, () => console.log(`Listening on port ${port}!`));
