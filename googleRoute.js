const express = require('express');
const router = express.Router();
const passport = require('passport')
const passportSetup = require('./passport-setup.js');

router.get('/', passport.authenticate('google', {

  scope: ['profile']
}))





module.exports = router;