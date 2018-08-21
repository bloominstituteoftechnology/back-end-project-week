const express = require('express');
const noteRoutes = require('./notes/noteRoutes');
const userRoutes = require('./users/userRoutes');

const router = express.Router();

router.use('/notes', noteRoutes);
router.use('/users', userRoutes);

module.exports = router;