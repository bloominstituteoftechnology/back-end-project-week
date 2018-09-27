const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./db/dbconfig');

const server = express();



server.use(helmet());
server.use(express.json());
// server.use(cors());
server.use(cors({origin: "http://localhost:3000"}))

server.use(morgan('combined'))

server.get('/', (req, res) => {
    res.json({ message: "API is working" });
  })
  
  server.get('/api/notes',   (req, res) => {
    db('notes')
      .then(notes => {
        notes = notes.filter(note => note.username === req.headers.username);
        if (notes.length === 0) {
          res.status(200).json({ notes })
          return;
        } else {
          res.status(200).json({ notes })
          return;
        }
      })
      .catch(err => {
        res.status(500).json({ message: "There was an error in getting notes" })
        return;
      });
  })
  
  server.post('/api/notes',   (req, res) => {
    const { title, content} = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and message are required" })
    db('notes')
      .insert({ title, content })
      .then(res => res.status(201).json({ title, content }))
      .catch(() => res.status(500).json({ message: "Note could not be saved" }))
  })
  
  // server.get('/api/notes/:id',   (req, res) => {
  //   const { id } = req.params;
  //   db('notes')
  //     .where({ id })
  //     .then(note => {
  //       note = note.filter(note => note.username === req.headers.username);
  //       res.status(200).json(note);
  //     })
  //     .catch((err) => res.status(500).json(err));
  // });

  server.get("/api/notes/:id", (req, res) => {
    const { id } = req.params;
     console.log({id})
    db("notes")
      .where({ id: id })
      .then(note => {
        if (note.id === 0) {
          res.status(404).json({
            message: "The note with the specified ID does not exist."
          });
        } else {
          return res.status(200).json(note);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "The note could not be retrieved." });
      });
  });
  
  server.delete('/api/notes/:id',   (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id })
      .del()
      .then(id => {
        if( id === 0) {
          return res.status(404).json({err:" The note with that ID is not found "});
        } else {
        res.status(200).json({ id });
        }})
      .catch((err) => res.status(500).json(err));
  });
  
  // server.put('/api/notes/:id',   (req, res) => {
  //   const { id } = req.params;
  //   const { title, content } = req.body;
  //   db('notes')
  //     .where({ id })
  //     .update({ title, content })
  //     .then(id => {
  //       res.status(200).json(id);
  //     })
  //     .catch((err) => res.status(500).json(err));
  // });

  server.put('/api/notes/:id',   (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db('notes')
      .where({ id })
      .update({ title, content })
      .then(id => {
        if( id === 0) {
          return res.status(404).json({err:" The note with that ID is not found "});
        } else {
        res.status(200).json(id);
      }})
      .catch((err) => res.status(500).json(err));
  });
  

server.listen(9000);