const express = require('express');
const noteRoute = require('./noteRoutes');

const router = express.Router();

router.use('/notes', noteRoute);

module.exports = router; 