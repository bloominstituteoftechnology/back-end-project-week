const express = require('express');

const db = require('./data/dbConfig');

const endpoint = express.Router();

endpoint.get('/all', (req, res) => {
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

endpoint.get('/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id: Number(id) })
        .then(note => {
            if (note) {
                res
                    .status(200)
                    .json(note);
            } else {
                res
                    .status(404)
                    .json({ message: 'that note could not be located' });
            }
        })
        .catch(error => {
            res
                .status(500)
                .json(error);
        }) 
})

module.exports = endpoint;