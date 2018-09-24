const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const morgan = require("morgan"); 

const server = express(); 

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
    })
})

server.post("/notes", (req, res) => {
  db('notes')
    .insert(req.body)
    .then(noteId => {
      const id = noteId[0];
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json({ error });
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
      res.status(500).json(error)
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
