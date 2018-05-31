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

function getid(req, res) {
    const id = req.params.id;
    Note.findById(id).then(free => {
        res.status(200).json(free);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Note was not found"});
    });
}

function deleteid(req, res) {
    const id = req.params.id;
    if(!Note.findById(id)) {
        res.status(404).json({ message: 'Note not found'});
    }
    Note.findByIdAndRemove(id)
    .then(remove => {
        res.status(204).json(remove);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The note could not be removed" })
    });
}

function putid(req, res) {
    const {title, body} = req.body;
    const id = req.params.id;
    if(!Note.findById(id)) {
        res.status(404).json({ message: 'Note not found'});
    }
    Note.findByIdAndUpdate(id, req.body)
    .then(add => {
        res.status(201).json(add);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The note could not be removed" })
    });
}



module.exports = router;