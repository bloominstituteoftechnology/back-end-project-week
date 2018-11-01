const express = require('express');
const router = express.Router();
// helpers
const getHelper = require('./helpers/read/getHelpers.js');
const deleteHelper = require('./helpers/delete/deleteHelpers.js')
const postHelper = require('./helpers/create/postHelpers.js');
const putHelper = require('./helpers/update/putHelpers.js');

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
      .then(notesDeleted => {
        res.status(200).json({ message: `${notesDeleted} note(s) were deleted`})
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
  const note = req.body;
  postHelper
    .createNote(note)
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
  const note = req.body;
  const { id } = req.params;
  putHelper
    .updateNote(id, note)
      .then(notesDeleted => {
        res.status(200).json({ message: `${notesDeleted} note(s) were updated` });
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

// export

module.exports = router;