const express = require('express');
const User = require('./User.js');
const { authenticate, makeToken } = require("../utilities/JWT");
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (!req.session.auth) res.status(422).json('Not Authenticated');
    if (req.session._id)
      res
        .status(200)
        .json({
          success: true,
          _id: req.session._id,
          username: req.session.username,
        });
  })
  .post(authenticate,(req, res) => {
    if (!(req.body.username && req.body.password)) {
      res.status(422).json({ error: 'Provide Username and Password' });
    } else {
      User.create({
        username: req.body.username.toLowerCase(),
        password: req.body.password,
      })
        .then(saved => {
          req.session.auth = true;
          req.session._id = saved._id;
          req.session.username = saved.username;
          res.status(201).json(saved);
        })
        .catch(error => {
          console.log(error);
          if (error.code === 11000)
            res
              .status(422)
              .json({ success: false, message: 'User Already Exists' });
          else
            res
              .status(500)
              .json({ success: false, message: 'Error' });
        });
    }
  });

router.route('/login').post(authenticate, (req, res) => {
  const {username, password} = req.body;
  if (!(req.body.username && req.body.password)) {
    res.status(422).json({ error: 'Provide Username and Password' });
  } else {
    User.findOne({ username: req.body.username.toLowerCase() }, async function(
      err,
      user
    ) {
      if (err)
        res
          .status(500)
          .json({ success: false, message: 'Error' });
      if (user === null)
        res.status(404).json({ success: false, message: 'User Not Found' });
      if (user) {
        await user.isPasswordValid(password, function(err, isMatch) {
          if (err)
            res
              .status(500)
              .json({ success: false, message: 'Error' });
          if (isMatch) {
            req.session.auth = true;
            req.session._id = user._id;
            req.session.username = user.username;
            res.status(200).json({ success: true, user: user, token: makeToken(req.user) });
          } else res.status(422).json({ success: false, message: 'Invalid Password' });
        });
      }
    });
  }
});

router.route('/logout').post((req, res) => {
  req.session.destroy(err => res.json(err));
  res.status(200).json('Logout Successful');
});

module.exports = router;