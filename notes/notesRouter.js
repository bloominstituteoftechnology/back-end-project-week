const express = require('express');
const router = express.Router();
const db = require('./notesModel');

// Notes endpoints
router.get('/notes/', (req, res) => {
  res.status(200).send('Server Listens and Obeys or WTFDoes it???');
});

router.get('/notes/all/', async (req, res) => {
  try {
    const notes = await db.getAll();
    console.log('the notes are... ', notes);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'There was an error while getting the notes. The error is ', error });
  }
});

router.post('/notes/create', async (req, res) => {
  const NoteData = req.body;
  console.log(req.body);
  if (!NoteData.title || !NoteData.textBody) {
    res.status(422).json({ errorMessage: 'Please provide a title and/or textBody for your note.' });
  } else if (!db.findByTitle(NoteData.title)) {
    res.status(405).json({ errorMessage: 'Duplicate Note Titles Not Allowed' });
  } else {
    try {
      const newGame = await db.insert(NoteData);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ error: 'There was an error while saving the note to the database. The error is ', error });
    }
  }
});

router.delete('/notes/delete', async (req, res) => {
  const { noteID } = req.params;

  try {
    const deletedNoteCount = await db('notes')
      .where({ id: noteID })
      .del();
    {
      deletedNoteCount === 0
        ? res.status(404).json({ message: 'The note with the specified ID does not exist.' })
        : res.status(200).json({ deletedNoteCount });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
