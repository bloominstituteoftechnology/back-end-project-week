const express = require('express');
const mongoose = require('mongoose'); // needs to go into model

const server = express();

// will go into model, also add a note author
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);
server.get('/', (req, res, next) => {
  Note.find({})
    .then(notes => {
      console.log(notes);
      //res.status(200).json('API is running ok ok!', notes);
    })
    .catch(err => {
      console.log(err);
    });
});

server.get('/post', (req, res, next) => {
  const newNote = new Note({ title: 'debugger', content: 'just work please!' });
  newNote
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = server;
