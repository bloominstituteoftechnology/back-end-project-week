const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const server = express();

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));

server.get('/', (req, res) => {
  res.send('Running....');
});

// ! ====================== GET  
server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes => {
      if (notes.length === 0) {
        res.status(404).json({ message: "notes could not be found" })
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

server.post('/api/notes', (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) return res.status(400).json({ message: "Title and message are required" })
  db('notes')
    .insert({ title, message })
    .then(result => res.status(201).json({ title, message }))
    .catch(() => res.status(500).json({ message: "Note could not be saved" }))
})

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id })
    .del()
    .then(id => {
      res.status(200).json({ id });
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, message } = req.body;
  db('notes')
    .where({ id })
    .update({ title, message })
    .then(id => {
      res.status(200).json(id);
    })
    .catch((err) => res.status(500).json(err));
});


server.listen(8000, () => {
  console.log('API running on port 8000')
});