const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const Note = require('./model');


const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

server.post('/note/create', (req, res) => {
  const { title, content } = req.body;
  const myNote = new Note({ title, content });
  myNote
    .save()
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(422);
      res.json({ error: 'Error saving your note to the DB', message: err });
    });
});

server.get('/notes/get', function (req, res) {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(500);
      res.json({ error: 'Something really bad happened' });
      return;
    }
    res.json(notes);
  });
});

server.put('/note/update', (req, res) => {

  const { title, id } = req.body;
  if (!title || !id) {
    return res.status(422).json({ error: 'Must Provide a title && Id' });
  }
  Note.findById(id, (err, note) => {
    if (err || note === null) {
      res.status(422);
      res.json({ error: 'Cannot find note with that id' });
      return;
    }
    note.title = title;
    note.save((saveErr, savedNote) => {
      if (err || note === null) {
        res.status(500);
        res.json({ error: 'Something really bad happened' });
        return;
      }
      res.json(note);
    });
  });
});

server.delete('/note/destroy/:id', (req, res) => {
  
  let id = undefined;
  if (req.params.id) {
    // if it's on the params set it.
    id = req.params.id;
  }
  if (req.body.id) {
    // if it's on the body set it.
    id = req.body.id;
  }
  if (id === undefined) {
    // if it's undefined throw error back to client
    res.status(422);
    res.json({ error: 'You need to give me an ID' });
    return;
  }
  Note.findByIdAndRemove(id, (err, removedNote) => {
    // search for a note by that id and remove it
    if (err) {
      res.status(422);
      res.json({ error: 'Cannot find note with that id' });
      return;
    }
    res.json({ success: `${removedNote.title} was removed from the DB` });
  });
});

module.exports = server;
