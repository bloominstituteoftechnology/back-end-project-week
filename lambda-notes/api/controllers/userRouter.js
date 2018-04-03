const express = require('express');
const User = require('../models/userSchema.js');
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
    // create user takes in the username and password and saves a user.
    // our pre save hook should kick in here saving this user to the DB with an encrypted password.
    user.save((err, user) => {
      if (err) return res.send(err);
      res.json({
        success: `User saved`,
        user
      });
    });
  };

const newLogin = (req, res) => {
    const userInfo = req.body;
    const user = user.find()
    user
    .save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while logging in.` });
    })
}

module.exports = { userRouter, newUser, newLogin };