const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("./userModel");
const Notes = require("../notes/noteModel");
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
  .get("/:id/notes", authenticate, (req, res) => {
    let searchId = req.params.id;
    Notes.find({ userid: searchId })
      .then(notes => {
        if (notes === null)
          res.status(404).json({
            message: "No notes exist for this user."
          });
        else res.status(200).json(notes);
      })
      .catch(error => {
        res.status(500).json({ error: error });
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
        res
          .status(500)
          .json({ message: "The user could not be removed", error: error });
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
    User.findOne({ username }).then(user => {
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
      } else res.status(422).json({ error: "Invalid Credentials." });
    });
  })
  .post("/register", (req, res) => {
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
