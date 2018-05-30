const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Keys = require('../config/keys');
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
    User.findOne({email}) 
      .then(user => {
        if (!user) {
          res.status(404).json('User not found!');
        }
        bcrypt.compare(password, user.password) 
          .then(isMatch => {
            const paylaod = {id: user.id, name: user.name}
            jwt.sign(payload, keys.secret, {expiresIn:3600}, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer' + token
              })
            })
          })
        res.status(404).json('Password is incorrect');
      });
  });

module.exports = router;