const express = require('express');
const notesDB = require('../data/helpers/notesDB');
const { noteConstraints } = require('../middleware');
const router = express.Router();

// get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await notesDB.get();
    if (notes.length === 0) {
      res.status(200).json({ message: 'There are currently no notes' });
    } else {
      res.status(200).json(notes);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// get a note by id
router.get('/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const note = await notesDB.get(ID);
    if (typeof note === 'undefined') {
      res.status(400).json({ message: `There is no note with id:${ID}` });
    } else {
      res.status(200).json(note);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// post a note
router.post('/', noteConstraints, async (req, res) => {
  //TODO save ID in JWT(?) so know who is logged in
  const U_ID = 1;
  // middleware sets the req
  const { TITLE, CONTENT } = req;

  const NOTE = { title: TITLE, content: CONTENT, u_id: U_ID };

  try {
    const note = await notesDB.insert(NOTE);
    res.status(200).json({ message: `Note id:${note.id} has been posted.` });
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// update a note
router.put('/:id', noteConstraints, async (req, res) => {
  const ID = req.params.id;
  // middleware sets the req
  const { TITLE, CONTENT } = req;

  const NOTE = { title: TITLE, content: CONTENT };

  // make sure we have the note to update
  try {
    const note = await notesDB.get(ID);
    if (typeof note === 'undefined') {
      res.status(400).json({ message: `There is no note with id:${ID}` });
    } else {
      // we do! try to update the note
      try {
        const note = await notesDB.update(ID, NOTE);
        res.status(200).json({ message: `Note id:${ID} has been updated.` });
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// delete a note
router.delete('/:id', async (req, res) => {
  const ID = req.params.id;

  // make sure we have the note to delete
  try {
    const note = await notesDB.get(ID);
    if (typeof note === 'undefined') {
      res.status(400).json({ message: `There is no note with id:${ID}` });
    } else {
      // we do! try to delete the note
      try {
        const note = await notesDB.remove(ID);
        res.status(200).json({ message: `Note id:${ID} has been deleted.` });
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
