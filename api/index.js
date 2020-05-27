const usersRouter = require('./users/index.js');
const notesRouter = require('./notes/index.js');
const express     = require('express');
const router      = express.Router();

router.use( usersRouter );
router.use( notesRouter );

module.exports = router;
