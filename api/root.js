const express = require('express');
const router = express.Router();

router.use('/notes', require('./notes'));

router.get('/', (req, res) => {
    res.json({api: "active"});
});

module.exports = router;