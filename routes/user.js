const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../modules/users');

const router = express.Router();

router
  .route('/register') 
  .post((req, res) => {
    User.findOne({email: req.body.email})
      .then(user => {
        if (user) {
          res.status(400).json('Email already exists');
        }
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(12, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.status(200).json(user);
              })
              .catch(err => console.log(err));
          });
        });
      })
      .catch(err => console.log(err));
  });

router 
  .route('/login')
  .post((req, res) => {
    const { username, password } =req.body;
    User.findOne({ username });
  })

module.exports = router;