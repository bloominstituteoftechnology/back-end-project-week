const router = require('express').Router();
const notes = require('./notes');
const auth = require('./auth');

router.use('/notes', notes);
router.use('/', auth);

module.exports = router;
