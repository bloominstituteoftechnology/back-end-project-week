const express = require('express');
const jwt = require('jsonwebtoken');

const Note = require('../models/Note');
const User = require('../models/User');

const server = express();

server.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser
        .save()
        .then(User => {
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'User Post Error' });
        });
});

