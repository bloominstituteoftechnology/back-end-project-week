const express = require('express');
const notesModel = require('../data/helpers/notesModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await notesModel.readAll();
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).send({ error: 'Sorry, your notes could not be retrieved.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await notesModel.read(req.params.id);
    if (note.length === 0) {
      res.status(404).send({ error: 'A note with the specified ID does not exist.'});
    } else {
      res.status(200).json(note);
    }
  } catch (err) {
    res.status(500).send({ error: 'Your note could not be retrieved.' });
  }
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).send({ error: 'Please provide a title for the post.' })
  } else {
    try {
      const added = await notesModel.create(req.body);
      const notes = await notesModel.readAll();
      res.status(200).json(notes);
    } catch (e) {
      res.status(500).send({ error: 'There was an error while saving your note to the database.' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const noteId = req.params.id;
    if (!title) {
      res.status(400).send({ error: 'Please provide title for the note.' })
    } else {
      let note = await notesModel.read(noteId);
      if (note.length === 0) {
        res.status(404).send({ error: 'A note with the specified ID does not exist.' })
      } else {
        const numUpdatedRows = await notesModel.update(noteId, req.body);
        if (numUpdatedRows === 0) {
          throw new Error(500);
        } else {
          const notes = await notesModel.readAll();
          res.status(200).json(notes);
        }
      }
    }
  } catch (e) {
    res.status(500).send({ error: 'The note could not be modified.' });
  }  
});

router.delete('/:id', async (req, res) => {
  try {
    const note = await notesModel.read(req.params.id);
    if (note.length === 0) {
      res.status(404).send({ error: 'A note with the specified ID does not exist.' })
    } else {
      const numUpdatedRows = await notesModel.remove(req.params.id);
      if (numUpdatedRows === 0) {
        throw new Error(500);
      } else {
        const notes = await notesModel.readAll();
        res.status(200).json(notes);
      }
    }
  } catch (err) {
    res.status(500).send({ error: 'The note could not be removed.' });
  }
});

module.exports = router;