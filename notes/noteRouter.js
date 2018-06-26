const router = require('express').Router();
const jwt = require("jsonwebtoken");
const secret = "Wouldn't you like to know"

const Note = require('./Note');

router
    .route('/')
    .get((req, res) => {
        Note
            .find()
            .then(notes => {
                res.status(200).json(notes);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })
    .post((req, res) => {
        const { title, body } = req.body;
        Note
            .create({ title, body })
            .then(notes => {
                res.status(201).json(notes);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

module.exports = router;