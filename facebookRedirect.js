const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passport-setup-facebook.js');

router.get('/', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users'
}), (req, res) => {

  console.log('facebook redirecting.....!!!');
  res.redirect('http://localhost:3000/app')

})





module.exports = router;