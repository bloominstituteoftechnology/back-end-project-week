const express = require('express');

//subroutes
const notes = require('./notes');

const router = express.Router();

//use subroutes
router.use('/notes', notes);

module.exports = router;
