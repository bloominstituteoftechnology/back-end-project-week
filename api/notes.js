const express = require('express'),
    router = express.Router(),
    db = require('../data/helpers/noteModel.js');

router
    .post('/create', function (req, res) {
        const { title, textBody } = req.body;
        console.log(req.body);

        if (!title || !textBody) return res.status(400).json({ errorMessage: "Missing title and/or text body" });

        db.insert(req.body)
            .then(note => res.status(201).json(note))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the note to the database" });
            });
    })

    .get('/get', function (req, res) {
        db.get()
            .then(notes => res.json(notes))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "The notes could not be retrieved" });
            });
    })

    .get('/get/:id', function (req, res) {
        db.get(req.params.id)
            .then(note => {
                if (!note) return res.status(404).json({ message: "The note with the specified ID does not exist" });
                res.json(note);
            }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "The note could not be retrieved" });
        });
    })

    .delete('/delete/:id', function (req, res) {
        db.remove(req.params.id)
            .then(note => {
                if (!note) return res.status(404).json({ message: "The note with the specified ID does not exist" });
                res.json(note);
            }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "The note could not be removed" });
        });
    })

    .put('/update/:id', function (req, res) {
        const { title, textBody } = req.body;

        if (!title || !textBody) return res.status(400).json({ errorMessage: "Please provide title and text body for the project" });

        db.update(req.params.id, req.body)
            .then(note => {
                if (!note) return res.status(404).json({ message: "The note with the specified ID does not exist" });
                res.json(note);
            }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "The note could not be modified" });
        });
    });

module.exports = router;