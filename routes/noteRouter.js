const router = require('express').Router();

const Note = require('../models/Note');

router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/:id')
    .get(getById)
    .put(put)
    .delete(destroy);

function get(req, res) {
    Note.find({userId: req.user})
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json({err: 'something went wrong'}))
};

function post(req, res) {
    if('title' in req.body && 'text' in req.body) {
        const noteBody = { text: req.body.text, title: req.body.title, userId: req.user};
        const newNote = new Note(noteBody);
        newNote.save()
            .then(doc => res.status(201).json(doc))
            .catch(err => res.status(500).json({err: 'something went wrong'}));
    } else {
        res.send('title, text and a user are required');
    }
};

function getById(req, res) {
    const { id } = req.params;

    Note
        .findById(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json(console.log('error fetching note', err));
        });
};

function put(req, res) {
    const { id } = req.params;
    if('title' in req.body && 'text' in req.body) {
        const { title, text, completed } = req.body;
        Note.findOneAndUpdate({_id: id}, {$set:{title, text, completed}})
            .then(doc => res.status(204).json(doc))
            .catch(err => res.status(500).json({err: 'something went wrong'}));
    } else {
        res.send('title and text are required');
    }
};

function destroy(req, res) {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(500).json({err: 'failed to delete note'}))
};

module.exports = router;