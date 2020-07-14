const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const notes = require('./notesModel');


router
    .route('/')
    .get((req, res) => {
        notes.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            })
    })

    .post((req, res) => {
        const { title, content } = req.body;
        const charNew = new notes.Model({ title, content });
        charNew
            .save()
            .then(charAdded => {
                res.status(200).json(charAdded);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            })
    })

module.exports = router;

