const express = require('express');
const router = express.Router();
const db = require('../data/helpers/index');

router.get('/', async (req, res) => {
    try {
        const notes = await db.get();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
