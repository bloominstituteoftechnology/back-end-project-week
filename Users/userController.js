const express = require("express");
const router = express.Router();

const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares");

const secret = "something very random";

// get
router.get("/", authenticate, (req, res) => {
  let query = User.find();

  query
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET with ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// post
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  user.save((err, user) => {
    if (err) return res.send(err);
    const token = getTokenForUser({
      username: user.username
    });
    res.json({ token });
  });
});

// delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Cannot find user" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// put
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userEdited = req.body;

  User.findByIdAndUpdate(id, userEdited)
    .then(response => {
      if (response === null) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        res.status(400).json({
          errorMsg: "invalid ID, check and try again."
        });
      } else {
        res.status(500).json(err);
      }
    });
});

const getTokenForUser = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: "1h" });
};

module.exports = router;
