const express = require('express');
const cors = require('cors');
const server = express();
const knex = require('knex');
const dbConfig =require('./knexfile')
const db = knex(dbConfig.development)

server.use(express.json());
server.use(cors());

server.get('/api/notes', (req, res) => {
  db('notes')
    .then(notes=>{
      res.status(200).json(notes)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.get('/api/notes/:id',  (req, res) => {
  const { id } =req.params;
  db('notes')
    .where({ id })
    .then(notes=>{
      res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.post('/api/notes', (req, res) => {
  const note = req.body;
  db.insert(note)
    .into('notes')
    .then(ids => {
      res.status(201).json(ids)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.put('/api/notes/:id', (req, res) => {
  const { id } =req.params;
  db('notes')
    .where({ id })
    .update(req.body)
    .then(notes=>{
        res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.delete("/api/notes/:id", async (req, res) => {
  const { id } =req.params;
  db('notes')
    .where({ id })
    .del()
    .then(notes=>{
        res.status(200).json(notes)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.listen(5000, () => {
  console.log('Server listening on 5000');
});