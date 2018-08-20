const express = require('express')
const notesRoute = require('./notesRoute')

const router = express.Router();

router.use('/notes', notesRoute);

module.exports = router;