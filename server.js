const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteSchema = require('./models/noteSchema');
const userSchema = require('./models/userSchema');
const PORT = 5000;
const server = express();
server.use(express.json());
server.use(sesssion({

}))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/noteSchema');

server.get('/', (req, res) => {
  noteSchema.find({}, (err, database) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(database);
    }
  });
});

server.post('/', (req, res) => {
  const noteData = req.body;
  const note = new Note(noteData);

  note
    .save()
    .then(newNote => {
      res.status(200).json(newNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error adding your note', error: err });
    });
});

server.put('/', (req, res) => {
  const note = req.body;
  noteSchema.findByIdAndUpdate({ id: note.id }, note, { new: true })
    .then(changedNote => {
      res.status(200).json(changedNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error updating your note', error: err });
    });
});

server.delete('/', (req, res) => {
  const { id } = req.boy;
  noteSchema.findByIdAndRemove({ id })
    .then(removedNote => {
      res.status(200).json(removedNote);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error deleting your note', error: err });
    });
});





server.listen(PORT, err => {
  if (err) {
    console.log('Server error', err);
  } else {
    console.log(`The server is listening on port: ${PORT}.`);
  }
});

module.exports = server;