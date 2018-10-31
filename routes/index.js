require('dotenv').config();
const express = require('express');
const notesRoutes = require('./notesRoutes.js');
const router = express.Router();
 
router.use('/notes', notesRoutes);
 
module.exports = router;