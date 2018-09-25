const express = require('express');
const server = express();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const dBConfig = require('./knexfile');
const db = knex(dBConfig.development);

//Middleware
server.use(express.json());

//Endpoints
server.post('/api/addNote', (res, req) => {
    const newNote = req.body;
    db('notes')
        .insert(newNote)
        .then(res => {
            res.status(201).json(res)
        })
        .catch(err => res.status(500).send(err));
})












server.listen(3300, console.log('Listening on Port 3300'));