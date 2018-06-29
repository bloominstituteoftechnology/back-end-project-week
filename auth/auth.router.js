const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

module.exports = router;
