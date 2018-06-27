const mongoose = require('mongoose');
const express = require('express');

const port = 5000;
const server = express();

server.use(express.json());

const userErrorMessage = (status, message, res) => {
    res.status(status).json({ err: message });
    return;
}


server
    .get('/api/users', (req, res) => {
        users
            .get()
            .then(notes => {
                res.json(notes);
            })
    });


server
    .get('/api/users/:id', (req, res) => {
        const { id } = req.params;
        users
            .get(id)
            .then(response => {
                res.json(response);
            })
            .catch(error => {
                res.json({ error: message });
            })
    });