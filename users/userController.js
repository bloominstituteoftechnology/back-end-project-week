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
  .delete("/:id", authenticate, (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .select("-password")
      .then(user => {
        if (user === null)
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        else
          res
            .status(200)
            .json({ message: "User was successfully removed.", user: user });
      })
      .catch(error => {
        res.status(500).json({ message: "The user could not be removed" }, err);
      });
  })
  .get("/:id", authenticate, (req, res) => {
    User.findById(req.params.id)
      .select("-password")
      .then(user => {
        if (user === null)
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        else res.status(200).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json(
            { message: "The user information could not be retrieved." },
            err
          );
      });
  });
router
  .post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(403).json({ error: "There was an error." });
        return;
      }
      if (user === null) {
        res.status(422).json({ error: "Invalid Credentials." });
        return;
      }
      const verified = user.validatePassword(password);

      if (verified) {
        const payload = {
          username: user.username,
          id: user._id
        };
        const token = jwt.sign(payload, config.secret);
        res.json({ token });
      } else res.send("Invalid Credentials.");
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
          username: user.username,
          id: user._id
        };
        const token = jwt.sign(payload, config.secret);
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
