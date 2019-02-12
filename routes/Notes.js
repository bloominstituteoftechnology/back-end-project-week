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


// PUT edits single note: /note/edit/id


// DELETE single note: /note/delete/id



/* ---------- Export ---------- */
module.exports = router;