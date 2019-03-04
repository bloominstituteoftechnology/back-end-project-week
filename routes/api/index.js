const express = require('express');
const router = express.Router();
const notesRoute = require('./notes');

router.use('/note', notesRoute);

module.exports = router;