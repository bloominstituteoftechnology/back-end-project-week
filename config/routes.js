const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate, generateToken } = require('./middlewares');

const db = require('../database/dbConfig');

module.exports = server => {
    server.post('/api/register', register);
    server.post('/api/login', login);
    server.get('/api/notes', authenticate, getNote);
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

function getNote(req, res) {
    
}