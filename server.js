const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./notes/projectModel.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// check if server is running
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

// getting all the notes
server.get('/notes', (req,res) => {
  db
  .getNotes()
  .then(notes => {
    res.status(200).json(notes)
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// getting a single note
server.get('notes/:id', (req,res)=> {
  db
  .getNotesById(id)
  .then(note => {
    res.status(200).json(note);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

server.post('/notes',(req,res)=> {
  const note = req.body;
    if(!note.title || !note.textBody) {
      res.status(400).json({error:"There is Either no Note Title or Note to create, please try again. If issue continues please contant customer support at 1-800-222-2gud4u"})
    }
    db
    .addNotes(note)
    .then(ids => {
      res.status(200).json(ids[1]);
    })
    .catch(err =>{
      res.status(500).json(err);
    });
});


server.put('/notes/:id', (req,res)=> {
  const {id} = req.params;
  const changes = req.body;

  db
  .editNotes(id, changes)
  .then(notes =>{
    res.status(200).json(notes);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

server.delete('/notes/:id', (req,res)=> {
  const { id } = req.params;

  db
  .deleteNotes(id)
  .then(notes => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = server;
