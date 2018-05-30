const express = require("express");
const User = require("../modules/users");

const router = express.Router();

router
  .route('/register')
  .post((req, res) => {
    User
      .create(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json('user already exists');
      })
  });

module.exports = router;