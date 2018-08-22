const express = require('express')
const notesRoutes = require('./notesRoutes')
const userRoutes = require('./userRoutes')

const router = express.Router();

router.use('/notes', notesRoutes);
router.use('/users', userRoutes);

module.exports = router;