const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const Note = require('./models/notes/Note');

const port = process.env.PORT || 3333;
const server = express();

mongoose
  .connect('mongodb://devon:dvnbcn44@ds239940.mlab.com:39940/lambda-notes')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database');
  });

server.use(cors({}));
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

server.route('/notes')
  .get((req, res) => {
    Note.find()
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  })
  .post((req, res) => {
    const note = new Note(req.body);

    note.save((note, err) => {
      if(err) res.status(201).json(err);
      else res.status(500).json(note);
    });
  });

server.listen(port, err => {
  if(err) console.log(err);
  console.log(`Magic happening on ${port}`);
});