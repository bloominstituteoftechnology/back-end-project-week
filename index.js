const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const morgan = require("morgan"); 

//new
require('dotenv').config(); 

const server = express(); 
server.use(express.json())
server.use(helmet());
server.use(cors());
server.use(morgan());

const db = require('./dbConfig');

server.get("/", (req, res) => {
  res.send("Hello World")
});

server.get("/notes", (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(error => {
      res.status(500).json({error: error.message})
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params; 
  db('notes')
    .where({ id })
    .then(note => {
      if(note){
        res.status(200).json(note)
      } else {
        res.status(404).json({errorMessage: "Cannot find"})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

server.post("/notes", (req, res) => {
  db('notes')
    .insert(req.body)
    .then(noteId => {
      const id = noteId[0];
      res.status(201).json(id)
    })
    .catch(error => {
      res.status(500).json({ error, errorMessage: error.message });
    });
});

server.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;  
  db("notes")
    .update(changes)
    .where({ id })
    .then(count => {
      if(count){
        res.status(200).json(count)
      } else {
        res.status(404).json({errorMessage: "Not found"})
      }
    })
    .catch(error => {
      res.status(500).json({error, errorMessage: error.message})
    });
});

server.delete("/notes/:id", (req, res) => {
  const { id } = req.params; 
  db("notes")
    .where({ id })
    .del()
    .then( count => {
      if(count) {
        res.status(204).end();
      } else {
        res.status(404).json({error: "Not found"});
      }
    })
    .catch(error => {
      res.status(500).json({ error }); 
    });
}); 

const port = process.env.PORT || 8080; 

server.listen(port, () => console.log(`API running on port ${port}`));
