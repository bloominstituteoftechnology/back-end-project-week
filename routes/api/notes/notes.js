const express = require('express');
const router = express.Router();

const db = require('../../../data/dbConfig');

// GET for /api/notes (refactor to own route one day)
router.get('/', async (req, res) => {
  res.json({ hello: 'there' });
});

module.exports = router;
