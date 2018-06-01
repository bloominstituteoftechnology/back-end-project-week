const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passport-setup-facebook.js');
router.get('/', passport.authenticate('facebook', {

  scope: ['profile']
}))







module.exports = router;