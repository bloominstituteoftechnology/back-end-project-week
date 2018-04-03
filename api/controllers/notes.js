const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/noteModels');
const User = require('../models/userModels');

const getNotes = (req, res) => {
  if (req.decoded) {
    User.findOne({ username: req.username })
      .then(user => {
        id = user._id;
        Note.find({ author: id })
          .then(notes => {
            res.json(notes);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    return res.status(422).json({ error: 'Please log in first to view your notes' });
  }
};

const createNote = (req, res) => {
  const { title, content } = req.body;
  const username = req.username;
  const author = req.author;

  if (req.decoded) {
    User.findOne({ username })
      .then(user => {
        const newNote = new Note({
          title,
          content,
          author: user._id
        });
        newNote
          .save()
          .then(note => {
            res.status(200).json(note);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    return res.status(422).json({ error: 'Please log in first to view your notes' });
  }
};

const editNote = (req, res) => {
  const { id, title, content } = req.body;
  const updateNote = {
    title,
    content
  };

  if (req.decoded) {
    Note.findByIdAndUpdate(id, updateNote, { new: true })
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    return res.status(422).json({ error: 'Please log in first to view your notes' });
  }
};

const deleteNote = (req, res) => {
  const { id } = req.body;

  if (req.decoded) {
    Note.findByIdAndRemove(id)
      .then(note => {
        res.json({ success: 'Successfully deleted your note' });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

module.exports = {
  getNotes,
  createNote,
  editNote,
  deleteNote
};