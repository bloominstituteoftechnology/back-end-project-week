const express = require('express');

//subroutes
const notes = require('./notes');
const users = require('./auth');

const router = express.Router();

//use subroutes
router.use('/', users);
router.use('/notes', notes);

module.exports = router;
