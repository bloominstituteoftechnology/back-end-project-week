const express = require("express")
const router = express.Router();

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authenticate, Secret } = require("../utilities/middleware");


router
  .post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Login error." });
        return;
      }
      if (user === null) {
        res.status(422).json({ error: "Invalid User Info." });
        return;
      }
      const verified = user.validatePassword(password);

      if (verified) {
        const payload = {
          username: user.username,
          id: user._id
        };
        const token = jwt.sign(payload, Secret);
        res.json({ token });
      } else res.send("Invalid User Info.");
    });
  })
  .post("/register", (req, res) => {
    const userData = req.body;

    const user = new User(userData);

    if (!(req.body.username && req.body.password))
      res.status(400).json({
        errorMessage: "Please provide username and password."
      });

    user
      .save()
      .then(user => {
        const payload = {
          username: user.username,
          id: user._id
        };
        const token = jwt.sign(payload, Secret);
        res.status(201).json({ user, token });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "Error Saving."
        });
      });
  })
  .get("/", authenticate, (req, res) => {
    User
      .find()
      .then(users => {
        users.length === 0 ?
          res.status(204).json({ message: 'Database empty.' }) :
          res.status(200).json(users)
      })
      .catch(err => res.status(500).json({ error: 'Server error fetching data.' }))
  })

  .get("/:id", authenticate, (req, res) => {
    User.findById(req.params.id)
      .select("-password")
      .then(user => {
        if (user === null)
          res.status(404).json({
            message: "User ID does not exist."
          });
        else res.status(200).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Server error retreiving." }, err);
      });
  })

  .delete("/:id", authenticate, (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .select("-password")
      .then(user => {
        if (user === null)
          res.status(404).json({
            message: "User ID error."
          });
        else
          res
            .status(200)
            .json({ message: "User deleted.", user: user });
      })
      .catch(error => {
        res.status(500).json({ message: "Server error deleting." }, err);
      });
  })


module.exports = router;
