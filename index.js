const express = require('express');
const db = require('./data/db');
const cors = require('cors'); 
const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('We runnin....')
  })

//Get Notes
//Endpoint Works
server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err))
})

//Post New Note
//Endpoint Works
server.post('/api/notes', (req, res) => {
    const {title, content} = req.body;
    db()
    .insert({title, content})
    .into('notes')
    .then(response => {
        res.status(201).json({title, content})
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Get Specific Note By ID
//Endpoint Works
server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where("id", Number(id))
    .then(note => {
        if (note.length === 0) {
            res
              .status(404)
              .json({ mesage: "The note with the specified ID does not exist." });
          }
        res.status(200).json(note)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//Update Note
//Endpoint Works
server.put('/api/notes/:id', (req, res) =>{
    const { id } = req.params;
    const {title, content} = req.body;
    db('notes')
    .where("id", Number(id))
    .update({title, content})
    .then(note => {
        res.status(201).json(note)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Delete Note
//Endpoint Works
server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where("id", Number(id))
    .delete()
    .then(note => {
        if(note.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting note"})
    });
})





  const PORT = process.env.PORT || 8000;


server.listen(
    PORT,
    console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
  );