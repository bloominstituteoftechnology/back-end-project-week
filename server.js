const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const Note = require('./models/note');

const server = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('\n==== Connected to Mongo ====\n');
  })
  .catch(() => {
    console.log('\n++++ ERROR connecting to Mongo ++++\n');
  });

server.use(morgan('combined'));
server.use(cors());
server.use(express.json());

// Controllers
// sanity check
server.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.json({ err: err.message });
    });
});

// POST
server.post('/api/notes', (req, res) => {
  const note = new Note(req.body);

  note
    .save()
    .then(savedNote => {
      res.json(savedNote);
    })
    .catch(err => {
      console.log(err.message);
    });
});

// DELETE
server.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(response => {
      Note.find({})
        .then(notes => {
          res.json(notes);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});
// PUT

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
