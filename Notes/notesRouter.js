const express = require('express');
const router = express.Router();
const Note = require('./notesModel');

//POST NOTES - Postman Test ok! http://localhost:8008/notes 
router.route('/')
.post((req, res) => {
    Note.create(req.body)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Creating Your Note' }));
})

//GET NOTES - Postman Test ok! http://localhost:8008/notes 
.get((req, res) => {
    Note.find()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Retrieving Your Notes' }))
})

//GET NOTES BY ID - Postman Test ok! http://localhost:8008/notes/5b0efc45a2dfa808189bafbe (successfully shows 'Test 2' by ID)
router.route('/:id')
.get((req, res) => {
    const {id} = req.params;
    Note.findById(id)
        .then(note => res.status(200).json(note))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Retrieving This Note By ID' }))
})

//DELETE NOTES BY ID - Postman Test ok! http://localhost:8008/notes/5b0eff5dd9a60a403c09e1f9 (successfully removed 'Test 4' by ID)
.delete((req, res) => {
    const id = req.params.id;
    if (! Note.findById(id)) {
        res.status(404).json({ Msg: 'Error' })
    }
    Note.findByIdAndRemove(id)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Deleting This Note By ID' }))
})

//PUT NOTES BY ID - Postman Test ok! http://localhost:8008/notes/5b0f1a1210124b170c2ff2fc (successfully updated 'Test 0' by ID)
.put((req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    if (! Note.findById(id)) {
        res.status(404).json({ Msg: 'Error' })
    }
    Note.findByIdAndUpdate(id, req.body)
        .then(add => res.status(201).json(add))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Updating Your Note' }));
})

module.exports = router;