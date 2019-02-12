const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');

const server = express();
const db = knex(dbConfig.development);
const PORT = 3000;

server.use(express.json());  //body parser middleware

server.get('/', (req , res) => {
    res.status(200).json({api: "Lambda Notes Backend!"})
})

server.get('/notes', (req, res) => {
    db('notes')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to retrieve Notes'})
    })
});

server.post('/notes', (req, res) => {
    const note = req.body;
    console.log('note info', note)
    db('notes').insert(note)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to insert note"});
    })
})

// GET notes by ID
server.get('/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find specific NOTE with ID"});
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})