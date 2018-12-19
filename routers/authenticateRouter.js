const express = require('express');

const router = express.Router();

const protected = require('../middleware/protected.js');

// [GET] /api/authenticated
// returns true if valid token, used for front end
router.get('/authenticated', protected, (req, res) => {
    res.status(200).send(true);
});

module.exports = router;