const router = require('express').Router();

const Note = require('./notesModel');

const User = require('./userModel');

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    .get(getid)
    .put(putid)
    .delete(deleteid)

function get(req, res) {
    Note.find().then(foo => {
        res.status(200).json(foo);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Note List was not found"});
    });
}

function post(req, res) {
    const note = new Note(req.body);
    note
        .save()
        .then(stuff => {
            res.status(201).json(stuff);
        })
        .catch(err => {
            res.status(500).json({ message: 'Make sure to fill out the title and body text areas with strings.'})
        });
}


module.exports = router;