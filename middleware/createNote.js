const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');

router.post('/', async (req, res) => {
  const note = req.body;
  if (note.title.length && note.content.length !== 0) {
    try {
      const noteId = await db.insert(note);
      const thisNote = await db.findById(noteId.id);
      res
        .status(201)
        .json(thisNote);
    } catch (error) {
      res
        .status(500)
        .json({
          errorMessage: 'There was an error saving note to database...',
          error
        })
    }
   }
})

module.exports = router;