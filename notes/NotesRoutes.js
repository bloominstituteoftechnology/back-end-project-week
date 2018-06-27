const express = require("express");
const router = express.Router();

const Note = require('./NotesModel');
const User = require('../users/UsersModel');

router
  .route('/')
  .get((req, res) => {
    // res.send("These are not the notes you are looking for.")
    Note.find()
      .then(found => {
        res.send(found);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  })
  .post((req, res) => {
    // res.json({ message: "Can't touch this.", body: req.body })
    Note.create(req.body)
      .then(savedNote => {
        res.status(200).json(savedNote);
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  })

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Note.findById(id)
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(note => {
        if (note === null) {
          res.status(404).json({ error: `Note not found with given id of ${id}.` });
          return;
        }
        res.json({
          deleted: `Note with id ${id} deleted.`,
          removedNote: Note
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Must provide title and content." });
      return;
    }
    Note.findByIdAndUpdate(id, req.body)
      .then(updatedNote => {
        if (updatedNote === null) {
          res.status(404).json({ error: `Note with id ${id} not found.` });
          return;
        }
        res.status(200).json({
          success: "Note successfully updated.",
          updatedNote: updatedNote
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });


module.exports = router;