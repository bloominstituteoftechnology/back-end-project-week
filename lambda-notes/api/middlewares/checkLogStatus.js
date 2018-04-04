const express = require('express');
const router = express.Router();


router.post('/', function(req, res, next) {
  // note that temp is filled even in error.
  // this incidently updates players even if its just 1-2 players...
  console.log('Sending invites...')
  next();
});

module.exports = router;
