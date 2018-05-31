const express = require('express');
const router = express.Router;
const User = require('./userSchema.js');

//grabs list of users

router.get('/user', (req, res) => {
  User
    .find()
    .then(users => {
      res
        .status(200)
        .json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({error: 'Could not retrieve data from server.'})
    });
})

//grab user id
  .get('/:id', (req, res) => {
  const {id} = req.params;
  User
    .findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({message: "User could not be found. Please try a different ID."});
      } else {
        res
          .status(200)
          .json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({error: 'Could not retrieve data from server.'})
    })
})