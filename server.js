const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;
const Note = require('./api/models/NoteSchema');

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

const server = express();

mongoose
  .connect('mongodb://localhost/notes')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('There was an error connecting to MongoDB', err);
  });

server.use(cors(corsOptions));
server.use(express.json());

server.get('/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.status(200).json(notes);
  }).catch(err => {
    res.status(500).json()
  })
})

server.listen(port, () => console.log(`Server is listening on port ${port}`));
