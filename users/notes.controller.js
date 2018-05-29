const express = require('express');
const User = require('./users.modelschema');
const Note = require ('./notes.modelschema');
const router = express.Router();

//GET NOTES
const GET = (req, res) => {
    Note
        .find()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Retreiving Your Notes' }))
}

//POST NOTES
const POST = (req, res) => {
    Note
        .create(req.body)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Creating Your Note' }))
}

//PUT NOTES

//DELETE NOTES

router.route('/')
    .get(GET)
    .post(POST)

module.exports = router;