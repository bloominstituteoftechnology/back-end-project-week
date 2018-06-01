const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passport-setup.js');
const { makeToken } = require("./makeTokenMWR.js");

router.get('/', passport.authenticate('google'), (req, res) => {
  // const token = makeToken(req.user);
  // console.log('token', token);
  // // res.status(200).json({ msg: token });

  res.redirect('http://localhost:3000/app')


})






module.exports = router;