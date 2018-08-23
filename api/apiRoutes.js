const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const notes = require('../data/helpers/noteHelpers');
const users = require('../data/helpers/userHelpers');

const noteCheck = (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "All fields must be completed." });
  }
  next();
};

router.put('/ordering', async (req, res) => { // updates a user's noteOrdering
  try {
    const updatedNoteOrdering = await users.updateNoteOrdering(1, req.body);
    if (updatedNoteOrdering === 0) {
      return res.status(404).json({ message: "Note ordering does not exist." });
    } else {
      return res.status(200).json(updatedNoteOrdering);
    }
  } catch (error) {
    res.status(500).json({ message: "Note ordering could not be saved.", error: error.message });
  }
});

router.get('/notes', async (req, res) => {
  try {
    const allNotes = await notes.get().orderBy('id', 'desc');
    const noteOrderingString = await users.getNoteOrdering(1);
    const noteOrderingArray = JSON.parse(noteOrderingString.noteOrdering);
    if (noteOrderingArray.length === 0) {
      return res.status(200).json(allNotes);
    } else {
      const orderedNotes = noteOrderingArray.map(ordering => {
        return allNotes.find(note => note.id === ordering);
      });
      return res.status(200).json(orderedNotes);
    }
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
    const noteOrderingString = await users.getNoteOrdering(1);
    const noteOrderingArray = JSON.parse(noteOrderingString.noteOrdering);
    noteOrderingArray.unshift(newNote.id);
    const updatedNoteOrdering = { noteOrdering: JSON.stringify(noteOrderingArray) };
    await users.updateNoteOrdering(1, updatedNoteOrdering);
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
      const noteOrderingString = await users.getNoteOrdering(1);
      let noteOrderingArray = JSON.parse(noteOrderingString.noteOrdering);
      noteOrderingArray = noteOrderingArray.filter(id => id != req.params.id);
      const updatedNoteOrdering = { noteOrdering: JSON.stringify(noteOrderingArray) };
      await users.updateNoteOrdering(1, updatedNoteOrdering);
      return res.status(200).json(deletedNote);
    }
  } catch (error) {
    return res.status(500).json({ message: "Note could not be deleted.", error: error.message });
  }
});

module.exports = router;
