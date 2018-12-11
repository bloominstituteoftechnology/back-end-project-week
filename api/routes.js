//const axios = require('axios');
//const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

//import middleware

module.exports = server => {
    server.get('/notes', getNotes);
    server.post('/notes', createNote);
    server.get('/notes/:id', getNoteById);
    server.put('/notes/:id', editNote);
    server.delete('/notes/:id', deleteNote);
}

const getNotes = (req, res) => {
    db('notes')
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ message: 'Error getting notes' }))
};  

const createNote = (req, res) => {
    const { title, textBody } = req.body;   
    const newNote = { title, textBody };
    db('notes')
        .insert(newNote)
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ message: 'Error creating note' }))
};

const getNoteById = (req, res) => {
    const { id } = req.params; 
    db('notes')
        .where('id', Number(id))
        .first()
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ message: 'Error getting note' }))
};

const editNote = (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .update(changes)
        .then(count => res.status(200).json({ count }))
        .catch(err => res.status(500).json({ error: err.message }))
};

const deleteNote = (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .del()
        .then(count => res.status(200).json({ count }))
        .catch(err => res.status(500).json({ message: 'Error deleting note' }))
};