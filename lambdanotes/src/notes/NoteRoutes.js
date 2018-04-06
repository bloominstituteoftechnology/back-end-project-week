const express = require('express');

const Note = require('./NoteSchema');

const router = express.Router();

// CREATE NOTE

router.post('/createNote', (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  note
    .save()
    .then(savedNote => {
      res.status(201).json(savedNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error creating note', error: err });
    });
});

// DISPLAY NOTES

router.get('/displayNotes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting notes', error: err });
    });
});

// DISPLAY SINGLE NOTE

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Note.findById(id)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ msg: 'Note not found', error: err });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting note', error: err });
    });
});

// DELETE NOTE

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ msg: 'Note not found', error: err });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error deleting note', error: err });
    });
});

// EDIT NOTE

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const noteData = req.body;

  Note.findByIdAndUpdate(id, noteData)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ msg: 'Note not found' });
      }
    })
    .catch(err => {
      if (err.name === 'Error!') {
        res
          .status(400)
          .json({ msg: `The id: ${err.value} is not valid`, error: err });
      } else {
        res.status(500).json({ msg: 'Error updating note', error: err });
      }
    });
});

module.exports = router;
