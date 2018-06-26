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

router
    .route('/:id')
    .get((req, res) => {
        Note
            .findById(req.params.id)
            .then(note => {
                res.status(200).json(note);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })
    .delete((req, res) => {
        Note
            .findByIdAndRemove(req.params.id)
            .then(note => {
                if(note){
                    res.status(200).json({ success: `Note with id ${req.params.id} has been removed from the database.` })
                } else {
                    res.status(404).json({ error: "The note with the specified id does not exist" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The note could not be removed", err })
            })
    })

module.exports = router;