const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("./userModel");
const config = require("../config");
const { authenticate } = require("../middlewares/middlewares");

router
  .get("/", authenticate, (req, res) => {
    User.find()
      .select("-password")
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Couldn't process that" });
        return;
      }
      if (user === null) {
        res.status(422).json({ error: "Invalid Credentials" });
        return;
      }
      user.checkPassword(password, (nonMatch, hashMatch) => {
        if (nonMatch !== null) {
          res.status(422).json({ error: "Invalid Credentials" });
          return;
        }
        if (hashMatch) {
          const payload = {
            username: user.username
          }; // what will determine our payload.
          const token = jwt.sign(payload, config.secret); // creates our JWT with a secret and a payload and a hash.
          res.json({ token }); // sends the token back to the client
        }
      });
    });
  })
  .post("/signup", (req, res) => {
    const userData = req.body;

    const user = new User(userData);

    if (!(req.body.username && req.body.password))
      res.status(400).json({
        errorMessage: "Please provide both a username and password."
      });

    user
      .save()
      .then(user => {
        const payload = {
          username: user.username
        }; // what will determine our payload.
        const token = jwt.sign(payload, config.secret); // creates our JWT with a secret and a payload and a hash.
        res.status(201).json({ user, token });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database."
        });
      });
  });

module.exports = router;
