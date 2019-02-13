const PORT = 5566;
const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');

const server = express();
const db = knex(dbConfig.development);
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Welcome!`)
})

server.post('/notes', (req, res) => {
    const note = req.body;
    db('notes_table').insert(note)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({err: 'Failed to insert note'});
    });
  });

server.get('/notes/', (req, res) => {
    db('notes')
    .then(rows => res.json(rows))
    .catch(err => {res.status(500).json({message: `Unable to find notes`})})
});

server.get('/notes/:id', (req, res) => {

});

server.put('/notes/:id', (req, res) => {

});

server.delete('/notes/:id', (req, res) => {

});

server.listen(PORT, () => {
    console.log(`Server is alive, alert, and enthusiastic on port ${PORT}`)
})