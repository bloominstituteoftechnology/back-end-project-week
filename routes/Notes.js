// Base requires:
const express = require('express');
const router = express.Router();

// App requires:
const notes = require('../data/helpers/noteModel');

/* ---------- Endpoints: ---------- */

// GET list of notes: /note/get/all
router.get( '/get/all', (req, res) => {
  notes.get()
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Note information could not be retrieved." });
    })
  // end-notes
});

// GET single note: /note/get/id
router.get( '/get/:id', (req, res) => {
  const { id } = req.params;

  notes.get(id)
    .then( (note) => {
      res.json(note);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Note ${id} could not be found.` });
    });
  // end-notes
});

// POST new note: /note/create
router.post( '/create', (req, res) => {
  const newNote = req.body;
  
  // CHANGE-THIS: Need to get logged in user's id and add it here.
  newNote.userId = 1;

  // Check for empty required title & body:
  if( newNote.title && newNote.textBody ) {
    notes.insert(newNote)
      .then( (noteId) => {
        res.json(noteId);
      })
      .catch( (err) => {
        res.status(500).json({ error: "Could not post new note." });
      });
    // end-notes
  } else {
    res.status(400).json({ error: "Please provide title and body of the note." });
  }
});

// PUT edits single note: /note/edit/id


// DELETE single note: /note/delete/id



/* ---------- Export ---------- */
module.exports = router;