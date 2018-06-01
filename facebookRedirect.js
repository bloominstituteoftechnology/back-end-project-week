const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passport-setup-facebook.js');

router.get('/', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: 'http://localhost:9000/google/login'
}), (req, res) => {

  console.log('facebook redirecting.....!!!');
  res.redirect('http://localhost:3000/app')

})

router.get('/', (req, res) => {

  res.send('facebook redirect')
})



module.exports = router;