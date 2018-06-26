const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId; 
const Note = require('./Note.js');

const router = express.Router();

router
  .route('/')
    .post((req, res) => {
        const { title, body, user } = req.body;
        if (!title || !body || !user) {
            res.status(400).json({ errorMessage: "Please provide title, body, and user for the note." })
            return;
        }
        Note.create(req.body)
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).json({ error: err.message }));
    })
     // .get((req, res) => {
     //     Note.find({
     //         user: ObjectId('5b3176454146a31a9c9aa2bd')
     //     })
     //     .populate('user')
     //     .then(notes => {
     //         res.status(200).json(notes);
     //     })
     //     .catch(err => res.status(500).json({ errorMessage: "The notes could not be retrieved." }));
     // });

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            Note.find({
                user: ObjectId(id)
            })
            .populate('user')
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        })
        .delete((req, res) => {
            const { id } = req.params;
            Note.findByIdAndRemove(id)
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        })
        .put((req, res) => {
            const { id } = req.params;
            const { title, body } = req.body;
             Note.findByIdAndUpdate(id, { title, body })
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        });

module.exports = router;