const express = require("express");

const User = require("../models/User.js");

const router = express();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  user
    .save()
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error registering the new user."
      });
    });
});

module.exports = router;
