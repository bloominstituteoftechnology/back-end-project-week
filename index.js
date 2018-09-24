const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./Database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());


server.get('/', (req, res) => {
    res.send('Hello!');
  });

//endpoints

//Display a list of notes
server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes)
    })
    .catch(error => {
        res.status(500).json({ error:'Unable to display notes' })
    })
});

//view an existing note
server.get('/api/notes/:id', (req, res) => {
   const { id } = req.params;
   db('notes')
   .where({ id })
   .then(response => {
      if (note) {
        res.status(200).json(response);
    }
    else {
      res.status(404).json({error: 'The note with this //ID is not found'});
     }
     })
   .catch(error => res.status(500).json({ error:'Cannot   retrieve note information'}));
 });





//Create a note with title and content
server.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title && !content) {
      res.status(400).json({ error:'Please provide a title and some content'})
    }
    db.insert({ title, content })
    .into('notes')
    .then(response => {
      res.status(201).json(response)
    })
    .catch(error => {
      res.status(500).json({ error:'Note not Created' })
    })
  });

  //Edit an existing note


server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { note }  = req.body;

    db('notes')
    .where({id})
    .update(note)
    .then(response => {
        res.status(200).json({response})
    })
    .catch(error => {
        res.status(500).json({ error:'Unable to edit note' })
      })
});











const port = 6000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});