//const axios = require('axios');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');

const { protected, generateToken } = require('./middleware.js');

module.exports = server => {
    server.get('/notes', getNotes);
    server.post('/notes', createNote);
    server.get('/notes/:id', getNoteById);
    server.put('/notes/:id', editNote);
    server.delete('/notes/:id', deleteNote);
    server.post('/notes/:id', register);
    server.post('/notes/login', login);
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

function register(req, res) {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => res.status(201).json(ids))
        .catch(err => res.status(400).json({ message: 'Registration failed' }))
};

function login(req, res) {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: 'Welcome', token });
            } else {
                res.status(401).json({ message: 'username or password information is incorrect'});
            }
        })
        .catch(err => res.status(400).json({ message: 'username or password information is incorrect'}))
};