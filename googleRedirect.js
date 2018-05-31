const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passport-setup.js');
const { makeToken } = require("./makeTokenMWR.js");

router.get('/', passport.authenticate('google'), (req, res) => {

  console.log('redirected page', req.user)
  res.redirect('http://localhost:3000/app')


})






module.exports = router;