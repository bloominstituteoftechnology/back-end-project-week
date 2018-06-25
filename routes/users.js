const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");

router.get("/", (req, res) => {
  res.json({test: "testing user router"})
})

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  User.findOne({email})
    .then(user => {
      if(user) {
        console.log("already have the email");
        return res.status(404).json({error: "Sorry already exist"});
      } else {
        const newUser = new User({username, email, password});
        bcrypt.genSalt(12, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              console.log(err);
            } else {
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.json(user);
                })
                .catch(err => {
                  res.status(500).json(err);
                })
            }
          })
        })
      }
    })
})

module.exports = router;