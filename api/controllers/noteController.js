const mongoose = require('mongoose');

const Note = require('../models/noteModel');

const getNotes = function(req, res) {
  if (req.decoded) {
    Note.find()
      .then(notes => {
        if (notes.length === 0 || !notes) {
          res.status(404).send({ message: 'Unable to find any notes' });
        } else {
          res.status(200).send(notes);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ error: `There was an error finding notes: ${err}` });
      });
  } else {
    res.status(422).json({ error: 'You must be logged in to use this function' });
  }
};

const newNote = function(req, res) {
  if(req.decoded) {
    const { title, name, noteText } = req.body;
    const note = new Note({ title, name, noteText });
  
    if (!title || !name || !noteText) {
      res.status(400).send({
        message:
          'You must include title, name, and note text to create a new note'
      });
    } else {
      note
        .save()
        .then(createdNote => {
          res.status(200).send(createdNote);
        })
        .catch(err => {
          res
            .status(500)
            .send({ error: `There was an error creating a new note: ${err}` });
        });
    }
  } else {
    res.status(422).json({ error: 'You must be logged in to use this function' });
  }
};

const getNoteById = function(req, res) {
  if(req.decoded) {
    const { id } = req.params;
  
    Note.findById({ id })
      .then(notes => {
        if (!notes || notes.length === 0) {
          res
            .status(404)
            .send({ message: "There weren't any notes with that ID" });
        } else {
          res.status(200).send(notes);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ error: `There was an error retrieving that note: ${err}` });
      });
  } else {
    res.status(422).json({ error: 'You must be logged in to use this function' });
  }
};

const editNote = function(req, res) {
  if(req.decoded) {
    const { id } = req.params;
    const updateNote = req.body;
  
    if (!updateNote.title || !updateNote.name || !updateNote.noteText) {
      res.status(400).send({
        message: 'Must include title, name, and note text to be updated'
      });
    } else {
      Note.findByIdAndUpdate(id, updateNote, { new: true })
        .then(updated => {
          res.status(200).send(updated);
        })
        .catch(err => {
          res
            .status(500)
            .send({ error: `There was an error updating that note: ${err}` });
        });
    }
  } else {
    res.status(422).json({ error: 'You must be logged in to use this function' });
  }
};

const deleteNote = function(req, res) {
  if(req.decoded) {
    const { id } = req.params;
  
    Note.findByIdAndRemove(id)
      .then(deleted => {
        if (!deleted) {
          res
            .status(404)
            .send({ message: "There doesn't seem to be a note with that ID" });
        } else {
          res.status(200).send(deleted);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ error: `There was an error deleting that note: ${err}` });
      });
  } else {
    res.status(422).json({ error: 'You must be logged in to use this function' });
  }
};

module.exports = {
  getNotes,
  newNote,
  getNoteById,
  deleteNote,
  editNote
};
