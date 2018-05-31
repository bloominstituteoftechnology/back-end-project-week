const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modules/users");

const router = express.Router();

router
  .route('/login')
  .post((req, res) => {
    const { username, password, email } = req.body;
    User.findOne({ username })
      .then(user => {
        user.validatePassword(password, (noMatch, isValid) => {
          if (noMatch !== null) {
            res.status(422).json('passwords do not match');
          }
          if (isValid) {
            const payload = { username: user.username, id: user._id };
            const token = jwt.sign(payload, '1995TY11AR10');
            res.status(200).json({ token });
          }
        })
      })
      .catch(err => {
        res.status(500).json('not registered');
      })
  });

module.exports = router;