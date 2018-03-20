const mongoose = require('mongoose');

const Note = require('../models/noteModel');

const getNotes = (req, res) => {
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
};

const newNote = (req, res) => {
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
};

const getNoteById = (req, res) => {
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
};

const editNote = (req, res) => {
  const { id } = req.params;
  const updateNote = req.body;

  if (!updateNote.title || !updateNote.name || !updateNote.noteText) {
    res
      .status(400)
      .send({
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
};

const deleteNote = (req, res) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(deleted => {
      if(!deleted) {
        res.status(404).send({ message: 'There doesn\'t seem to be a note with that ID' });
      } else {
        res.status(200).send(deleted);
      }
    }).catch(err => {
      res.status(500).send({ error: `There was an error deleting that note: ${err}` });
    });
};
