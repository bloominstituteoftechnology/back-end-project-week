const express = require('express');
const noteRoute = require('./noteRoute');

const router = express.Router();

router.use('/api/notes', noteRoute);

module.exports = router;