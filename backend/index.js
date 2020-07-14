const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./db/dbconfig');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


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
      .then(result => res.status(201).json({ title, content }))
      .catch(() => res.status(500).json({ message: "Note could not be saved" }))
  })
  
  server.get('/api/notes/:id',   (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id })
      .then(note => {
        note = note.filter(note => note.username === req.headers.username);
        res.status(200).json(note);
      })
      .catch((err) => res.status(500).json(err));
  });
  
  server.delete('/api/notes/:id',   (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id })
      .del()
      .then(id => {
        res.status(200).json({ id });
      })
      .catch((err) => res.status(500).json(err));
  });
  
  server.put('/api/notes/:id',   (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db('notes')
      .where({ id })
      .update({ title, content })
      .then(id => {
        res.status(200).json(id);
      })
      .catch((err) => res.status(500).json(err));
  });
  

server.listen(3300);