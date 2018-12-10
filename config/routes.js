//const axios = require('axios');
//const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const { server } = require('../server.js');


//import middleware

// module.exports = {

// }

server.get('/notes', (req, res) => {
    db('notes')
        .then(res => res.status(200).res.json(res.data))
        .catch(err => res.status(500).json({ message: 'Error getting notes' }))
});

server.post('/notes', (req, res) => {
    const { title, textBody } = req.body;
    const newNote = { title, textBody };
    db('notes')
        .insert(newNote)
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ message: 'Error creating note' }))
});

server.get('/notes/:id', (req, res) => {
    const { id } = req.params;  //id in {}?
    db('notes')
        .where({ id: id})
        .get(note)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ message: 'Error getting note' }))
});

server.put('/notes/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
        .where({ id: id})
        .update(changes)
        .then(count => res.status(200).json({ count }))
        .catch(err => res.status(500).json({ message: 'Error editing note' }))
});

server.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .del()
        .then(count => res.status(200).json({ count }))
        .catch(err => res.status(500).json({ message: 'Error deleting note' }))
});