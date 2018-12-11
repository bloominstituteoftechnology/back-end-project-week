const express = require('express');
const server = express();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const cors = require('cors');

server.use(express.json());
server.use(cors());


//GET a list of notes

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => res.status(200).json(notes))
    .catch(error => res.status(500).json({
        message: 'failed to get notes'
    }))
})

//GET notes by id

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({ id: id })
    .first()
    .then(notes => res.status(200).json(notes))
    .catch(error => res.status(500).json({ message: "can't find note by that id"}))
})

//POST a new note with a title and body

server.post('/api/notes', (req, res) => {
    const body = req.body;
    db('notes')
    .insert(body)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(error => res.status(500).json({
        message: 'Error posting new note'
    }))
})

//PUT - edit an existing note

server.put('/api/notes/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
    .where({ id: id })
    .update(changes)
    .then(count => {
        res.status(200).json({ count })
    })
    .catch(error => res.status(500).json({ message: 'Failed to edit note' }))
})

//DELETE a note by id

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
    .where({ id: id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => {
        res.status(400).json({ message: 'Failed to delete note' })
    })
})

//Login

server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'Welcome!', token})
        } else {
            res.status(401).json({ message: 'login failed' })
        }
    })
    .catch(err => res.json(err))
})

//Register

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 2);
    creds.password = hash;
    db('users')
    .insert(creds)
    .then((ids) => {
        res.status(200).json(ids);
    })
    .catch(err => res.status(400).json({message: 'Failed to register user'}))
})


module.exports = server;