const express = require('express');
const morgan = require('morgan');

const Note = require('./models/Note');

const server = express();

server.get('/notes', (req, res) => {
    Note.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem getting your notes', error: err });
        });
});