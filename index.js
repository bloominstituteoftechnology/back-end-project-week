const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const morgan = require("morgan"); 

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
  console.log(req.body, "body")
  db('notes')
    .insert(req.body)
    .then(noteId => {
      const id = noteId[0];
      res.status(201).json(id);
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ error, errorMessage: error.message });
    });
});

server.put("/notes/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  console.log(id, "id")
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
      console.log(error.message)
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



server.listen(8080, () => console.log("API running on port 8080"));
