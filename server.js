const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const note = require('./notes/noteModel')

const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.get('/', function(req, res) {
    res.status(200).json({ api: 'running!'});
});

server.post('/notes', function(req, res) {
    const noteInfo = req.body;
    const note = new note(noteInfo);

    note
        .save().then(savedNote => {
            res.status(201).json(savedNote);
        })
        
        .catch(err => {
            res.status(500).json({ msg: 'error creating note', error: err})
        });
});

mongoose
    .connect('mongodb://localhost/lambda-notes')
    .then(conn => {
        console.log('connected to mongo');
    })
    .catch(err => {
        console.log('error connecting to mongo');
    });
    
    
server.listen(port, () => console.log(`running on port ${port}`))



