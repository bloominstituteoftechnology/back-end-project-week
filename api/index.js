const router = require('express').Router();

router.use('/notes', require('./notes'));

module.exports = router;
