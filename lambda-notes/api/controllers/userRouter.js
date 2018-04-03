const express = require('express');
const User = require('../models/userSchema.js');
const { authenticate } = require('../utils/middlewares');

const jwt = require('jsonwebtoken');
const { key } = require('../../config');

const userRouter = express.Router();
const bcrypt = require('bcrypt');

// const newUser = (req, res) => {
//     const userInfo = req.body;
//     const user = new User(userInfo);

//     if (!user || !user.password ) {
//         res.status(400).json(`Your username or password is not defined.`)
//     }

//     if (!user.firstName || !user.lastName) {
//         res.status(400).json(`We need your first and last name.`)
//     }
    
//     user
//     .save()
//     .then(user => {
//         res.status(200).json(user);
//     })
//     .catch(err => {
//         res.status(500).json({ error: `There was an error while creating a user.` });
//     })
// }

const newUser = (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save((err, user) => {
      if (err) return res.send(err);
      res.json({
        success: `User saved`,
        user
      });
    });
  };

  const getUsers = (req, res) => {
    // This controller will not work until a user has sent up a valid JWT
    // check out what's going on in services/index.js in the `validate` token function
    User.find({}, (err, users) => {
      if (err) return res.send(err);
      res.send(users);
    });
  };

  const deleteUserById = (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;

    User.findByIdAndUpdate(id, userInfo)
        .then(user => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'User is not in our database.' });
        });
};
// const newLogin = (req, res) => {
//     const userInfo = req.body;
//     const user = user.find()
//     user
//     .save()
//     .then(user => {
//         res.status(200).json(user);
//     })
//     .catch(err => {
//         res.status(500).json({ error: `There was an error while logging in.` });
//     })
// }

const newLogin = (req, res) => {
    const { username, password } = req.body;
    const lowerCaseUsername = username.toLowerCase();
    User.findOne({ username: lowerCaseUsername }, (err, user) => {
      if (err) {
        res.status(403).json({ error: 'Invalid Username/Password' });
        return;
      }
      if (user === null) {
        res.status(422).json({ error: 'No user with that username in our database.' });
        return;
      }
      user.checkPassword(password, (nonMatch, hashMatch) => {
        if (nonMatch !== null) {
          res.status(422).json({ error: 'passwords don\'t match' });
          return;
        }
        if (hashMatch) {
          const payload = {
            username: user.username
          };
          const token = jwt.sign(payload, key);
          res.json({ token });
        }
      });
    });
  };

module.exports = { userRouter, newUser, newLogin, getUsers };