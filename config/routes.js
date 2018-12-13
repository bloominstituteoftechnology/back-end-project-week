const bcrypt = require('bcryptjs');
const jwtDecode = require('jwt-decode');

const { authenticate, generateToken } = require('./middlewares');

const db = require('../database/dbConfig');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.post('/api/notes', authenticate, getNote);
    server.post('/api/postnotes', authenticate, postNote);
    server.put('/api/notes/:id', authenticate, updateNote);
    server.delete('/api/notes/:id', authenticate, deleteNote);
    server.post('/api/notes/:id', viewNote)
}

function register(req, res) {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(creds);
        })
        .catch(err => {
            res.status(401).json({message: err})
        })
}

function login(req, res) {
    const creds = req.body;


    db('users')
        .where({username: creds.username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user)
                res.status(200).json(token)
            } else {
                res.status(401).json({message: 'You shall not pass'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
}

function postNote(req, res) {
    const posts = req.body;

    db('notes')
        .insert(posts)
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(401).json({message: err})
        })
}

function getNote(req, res) {
    const creds = req.body
    const token = jwtDecode(creds.token);
    db('notes')
        .where({username: token.username})
        .then(response => {
            res.status(200).json(token)
        })
        .catch(err => {
            res.status(500).json({message: 'Error fetching notes'})
        })
}

function updateNote(req, res) {
    const {id} = req.params;
    const action = req.body;

    db('notes')
        .where({id: id})
        .update(action)
        .then(count => {
            if(count) {
                res.status(200).json({message: `${count} action update`})
            } else {
                res.status(404).json({message: `action id not found`})
            }
        })
        .catch(err => {
            res.status(500).json({message: error})
        })
}

function deleteNote(req, res) {
    const { id } = req.params;

    db('notes')
        .where({id: id})
        .del()
        .then(count => {
            if(count) {
                res.status(200).json({message: `${count} action delete`})
            } else {
                res.status(404).json({message: `${count} action delete`})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
}

function viewNote(req, res) {
    const {id} = req.params;

    db('notes')
        .where({id: id})
        .first()
        .then(note => {
            console.log(note)
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(500).json({message: 'Error fetching note'})
        })
}