const express = require('express');
const router = express.Router();
const notes = require('../data/helpers');

const noteCheck = (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "All fields must be completed." });
  }
  next();
};

router.get('/notes', async (req, res) => {
  try {
    const allNotes = await notes.get();
    return res.status(200).json(allNotes);
  } catch (error) {
    return res.status(500).json({ message: "Notes could not be retrieved.", error: error.message });
  }
});

router.get('/notes/:id', async (req, res) => {
  try {
    const note = await notes.get(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note does not exist." });
    }
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ message: "Note could not be retrieved.", error: error.message });
  }
});

router.post('/notes', noteCheck, async (req, res) => {
  try {
    const newNote = await notes.insert(req.body);
    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(500).json({ message: "Note could not be added.", error: error.message });
  }
});

router.put('/notes/:id', noteCheck, async (req, res) => {
  try {
    const editedNote = await notes.update(req.params.id, req.body);
    if (editedNote === 0) {
      return res.status(404).json({ message: "Note does not exist." });
    } else {
      return res.status(200).json(editedNote);
    }
  } catch (error) {
    return res.status(500).json({ message: "Note could not be edited.", error: error.message });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await notes.delete(req.params.id);
    if (deletedNote === 0) {
      return res.status(404).json({ message: "Note does not exist." });
    } else {
      return res.status(200).json(deletedNote);
    }
  } catch (error) {
    return res.status(500).json({ message: "Note could not be deleted.", error: error.message });
  }
});

module.exports = router;
