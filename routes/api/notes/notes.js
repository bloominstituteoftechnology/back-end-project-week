const express = require('express');
const router = express.Router();

const db = require('../../../data/helpers/Note');

// GET all
// /api/notes
// returns an array of notes from all users
router.get('/', async (req, res) => {
  try {
    const notes = await db.getAll();
    return res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting the users.' });
  }
});

module.exports = router;
