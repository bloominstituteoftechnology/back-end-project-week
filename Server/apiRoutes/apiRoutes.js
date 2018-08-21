const express = require('express');
const noteRoute = require('./noteRoute');

const router = express.Router();

router.use('/notes', noteRoute);

module.exports = router;