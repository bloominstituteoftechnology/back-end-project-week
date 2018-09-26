const express = require('express');
const server = express();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const dBConfig = require('./knexfile');
const db = knex(dBConfig.development);

//Middleware
server.use(express.json());

//Endpoints
server.post('/api/addNote', (req, res) => {
    const newNote = req.body;
    db('notes')
        .insert(newNote)
        .then(res => {
            res.status(201).json(res)
        })
        .catch(err => res.status(500).send(err));
});

server.get('/api/notes', (req, res) => {
    db('notes')
        .select('id', 'title', 'textBody')
        .then(notes => {
            res.json(notes);
        })
        .catch(err => res.send(err));
});


server.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db('notes').where({id}).del()
        .then(count => res.status(204).end())
        .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db('notes').where({id}).select('id', 'title', 'textBody').then(id => {
        res.json(id);
    })
    .catch(err => res.send(err));
});

server.put('/api/notes', (req, res) => {
    db.update(req.params.id, req.body)
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json(err));
});




server.listen(3300, console.log('Listening on Port 3300'));