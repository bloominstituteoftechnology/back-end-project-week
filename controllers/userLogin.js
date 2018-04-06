const userSchema = require('../models/userSchema');
const express = require('express');

const userLogin = (req, res) => {
  const session = req.session;
  const { username, hashpassword } = req.body;

  userSchema.findOne({ username })
    .then(user => {
      if (user) {
        user
          .checkPassword(hashpassword)
          .then(ok => {
            if (ok) {
              session.username = user.username
              res.send(user._id);
            }
            else res.status(401).json({ error: 'Login Failed' });
          })
          .catch(err => {
            res.status(403).json({ error: 'Try Again, Invalid Input', });
          });
      };
    });
};
module.exports = {
  userLogin,
};