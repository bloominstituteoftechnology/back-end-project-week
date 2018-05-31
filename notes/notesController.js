const router = require('express').Router();

const Note = require('./Note');

router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/:id')
    // .get(getById)
    // .put(put)
    // .delete(destroy);

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

function getById(req,res) {
    const { id } = req.params;

    Note
        .findById(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            res.status(500).json(console.log('error fetching note', err))
        });
};

function put(req,res) {
    
}

function destroy(req,res) {
    
}

module.exports = router;