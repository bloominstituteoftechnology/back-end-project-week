const express = require('express');
const router = express.Router();
const routes = require('../../routes');

// ============ from ROUTES ============= //
const setupMiddleware = require('../../middleware')(router);
// ============ from ROUTES -- END ============= //

//schema
const User = require('./User.js');

//endpoints
router.post('/', function(req, res) {
    const credentials = req.body;
    const user = new User(credentials);
    user.save().then(inserted => {
      const token = makeToken(inserted);
      res.status(201).json(token);
    });
  });

module.exports = router;
