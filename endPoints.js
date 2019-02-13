const express = require('express');

const db = require('./data/dbConfig');

const endpoint = express.Router();

endpoint.get('/get/all', (req, res) => {
    db('notes')
        .then(notes => {
            res
                .status(200)
                .json(notes);
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: 'could not retrieve notes' });
        })
});

