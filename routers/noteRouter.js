// Import router extention & note Model
const router = require('express').Router();
const Note = require('../models/noteModel');

router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .get((req, res) => {
        res.status(200).json({ route: '/api/notes/' + req.params.id });
    })
    .delete((req, res) => {
        res.status(200).json({ status: 'work on delete!' });
    })
    .put((req, res) => {
        res.status(200).json({ status: 'work on put' })
    })

function get(req, res) {
    res.status(200).json({ route: '/api/notes/' });
}

function post(req, res) {
    const noteData = req.body;

    const note = new Note(noteData);

    note
        .save()
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}
// // Router Endpoints
// // (1) Posts a note to the Database
// function post(req, res) {
//     const 
//     note
//         .save()
//         .then(note => {
//             res.status(201).json(note)
//         })
//         .catch(err => {
//             res.json(err);
//         });
// };



module.exports = router;