const router = require('express').Router();

const Note = require('./Note');

router
    .route('/')
    .get(get)
    .post(post)

function get(req,res) {
    Note
        .find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json(console.log('error getting notes', err))
        });
};

function post(req, res) {
    const note = new Note(req.body);
    note
        .save()
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json(console.log('error making new note', err))
        });
};