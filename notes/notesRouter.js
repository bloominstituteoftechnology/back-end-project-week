const express = require('express');
const router = express.Router();
const db = require('./notesModel');
const knex = require('../data/dbConfig.js');

// Notes endpoints
router.get('/notes/', (req, res, next) => {
  res.status(200).send('Server Listens and Obeys or WTFDoes it???');
});

router.get('/notes/all/', async (req, res, next) => {
  try {
    const notes = await knex('notes');
    console.log('the notes are... ', notes);
    res.status(200).json(notes);
  } catch (error) {
    console.log('the error is... ', error);
    res.status(500).json({ error: 'There was an error while getting the notes. The error is ', error });
  }
});

router.get('/notes/allTest/:userId', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const notes = await knex('notes')
      .where({ user_id: Number(userId) })
      .select('id', 'title', 'textBody');

    console.log('the notes are... ', notes);
    res.status(200).json(notes);
  } catch (error) {
    console.log('the error is... ', error);
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
      const newGame = await knex('notes').insert(NoteData);

      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ error: 'There was an error while saving the note to the database. The error is ', error });
    }
  }
});

router.delete('/notes/delete/:noteId', async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    const deletedNoteCount = await db.remove(noteId);
    {
      deletedNoteCount === 0
        ? res.status(404).json({ message: 'The note with the specified ID does not exist.' })
        : res.status(200).json({ deletedNoteCount });
    }
  } catch (error) {
    console.log('the req.params.noteId is... ', req.params.noteId);
    console.log('the error is... ', error);

    res.status(500).json(error);
  }
});

router.put('/notes/edit/:noteId', async (req, res, next) => {
  const changes = req.body;
  const { noteId } = req.params;

  if (!changes.title) {
    res.status(400).json({ errorMessage: 'Please provide a title for the cohort.' });
  }

  try {
    const updatedNoteCount = await db.update(noteId, changes);
    {
      updatedNoteCount === 0
        ? res.status(404).json({ message: 'The note with the specified ID does not exist.' })
        : res.status(200).json({ updatedNoteCount });
    }
  } catch (error) {
    console.log('the req.params.noteId is... ', req.params.noteId);
    console.log('the error is... ', error);
    res.status(500).json(error);
  }
});

module.exports = router;
