const express = require('express');

const Note = require('./Note.js');

const router = express.Router();

router
  .route('/')
  .post((req, res) => {
    const { title, body, user } = req.body;
    if (!title || !body || user) {
        res.status(400).json({ errorMessage: "Please provide title, body, and user for the note." })
        return;
    }
    const newNote = new Note({ title, body, user });
    newNote.save() // filter, .select(), .where(), .sort()
      .then(result => res.json(result))
      .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;