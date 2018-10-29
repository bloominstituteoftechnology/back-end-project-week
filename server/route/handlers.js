const express = require('express');
const router = express.Router();
// helpers
const getHelper = require('./helpers/read/getHelpers.js');
const deleteHelper = require('./helpers/delete/deleteHelpers.js')

router.get('/', (req, res) => {
  getHelper
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
  getHelper
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
  deleteHelper
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