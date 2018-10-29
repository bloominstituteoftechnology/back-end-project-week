const express = require('express');
const helpers = require('./helpers.js');
const router = express.Router();

router.get('/', (req, res) => {
  helpers
    .getNotes()
      .then(notes => {
        console.log(notes);
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  helpers
    .getNote(id)
      .then(id => {
        res.status(200).json({ id });
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  helpers
    .deleteNote(id)
      .then(note => {
        console.log(note);
        res.status(200).json({ message: `${note} note(s) were deleted`})
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

// export

module.exports = router;