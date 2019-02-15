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
});

endpoint.post('/create', async (req, res) => {
    const note = req.body;
    db.insert(note)
        .into('notes')
        .then(note => {
            res
                .status(201)
                .json(note);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'could not add note' });
        })
});

endpoint.put('/edit/:id', (req, res) => {
    db('notes')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count) {
                db('notes')
                    .where({ id: req.params.id })
                    .first()
                    .then(note => {
                        res
                            .status(200)
                            .json(note);
                    })
            } else {
                res
                    .status(500)
                    .json({ message: 'could not edit note'});
            }
        })
        .catch(err => {
            res
                .status(404)
                .json({ message: 'could not save edit' });
        })
});

endpoint.delete('/delete/:id', (req, res) => {

})

module.exports = endpoint;