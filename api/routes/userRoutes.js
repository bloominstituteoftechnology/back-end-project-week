const express = require("express");

const User = require("../models/User.js");

const router = express();

router.route("/register").post((req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });

  user
    .save()
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error registering the new user."
      });
    });
});

router.route("/login").post((req, res) => {
  const { username, password, email } = req.body;

  
});

module.exports = router;
