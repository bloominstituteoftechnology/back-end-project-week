const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate, generateToken } = require('./middlewares');

const db = require('../database/dbConfig');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.post('/api/notes', authenticate, getNote);
    server.post('/api/postnotes', authenticate, postNote)
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
    db('notes')
        .where({username: creds.username})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({message: 'Error fetching notes'})
        })
}