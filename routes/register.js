const express = require("express");
const User = require("../modules/users");

const router = express.Router();

router
  .route('/register')
  .post((req, res) => {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    newUser.save()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
      // User
      //   .create(req.body)
      //   .then(user => {
      //     res.status(201).json(user);
      //   })
      //   .catch(err => {
      //     res.status(500).json('user already exists');
      //   })
  });

module.exports = router;