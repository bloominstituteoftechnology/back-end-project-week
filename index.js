const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const cors = require('cors');

const db = knex(knexConfig.development);
const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('https://vast-retreat-70533.herokuapp.com/', (req, res) => {
    db('notes')
    .then(project => res.status(200).json(project))
    .catch(error => res.status(500).json({ message: `Can't Retrieve notes Data`, error }))
});


server.post('/api/notes', (req, res) => {
    const note = req.body
    db('notes').insert(note)
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => res.status(500).json({ message: 'Error Posting New note', err }))
});


server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where('notes.id', '=', id)
    .then(portfolio => res.status(201).json(portfolio))
    .catch(error => res.status(500).json({ message: 'LERRRROOOOOOY JEENNNKIINNNNNNS! = You', error }))
});

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(project => res.status(200).json(project))
    .catch(error => res.status(500).json({ message: `Can't Retrieve notes Data`, error }))
});


server.put('/api/notes/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('notes')
    .where({ id })
    .update(changes)
    .then(count => {
        res.status(200).json({ count })
    })
    .catch(error => res.status(500).json({ message: `Could Not Implement '${changes}'`, error }))
});


server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    db('notes')
    .where({ id })
    .del()
    .then(count => {
        res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


const port = 7777;
server.listen(process.env.PORT || port, function() {
    console.log(`\n=== Web Api Listening @ http://localhost:${port} ===\n`);
})