const express = require('express');
const noteRoutes = require('./notes/noteRoutes');

const router = express.Router();

router.use('/notes', noteRoutes);

module.exports = router;