const express = require('express');
const router = express.Router();
const notesModel = require('./notesModel');

//GET NOTES
router.get('/', (req, res) => {
    Note
        .find()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Retrieving Your Notes' }))
})

//POST NOTES
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const noteData = { 
        title: title, 
        content: content 
    };
    const note = new Note(noteData);
    note.save()
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Creating Your Note' }));
}

module.exports = router;

// const POST = (req, res) => {
//     Note
//         .create(req.body)
//         .then(note => res.status(201).json(note))
//         .catch(err => res.status(500).json({ errorMsg: 'Sorry - There Was An Error Creating Your Note' }))
// }