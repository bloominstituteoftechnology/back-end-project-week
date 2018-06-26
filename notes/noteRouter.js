const express =  require('express');
const Note = require('./Note.js');
const router = express.Router();

router 
    .route('/')
        .post((req, res) => {
            const {title, body, user} = req.body;
            if (!title || !body) {
                res.status(400).json({errMessage: 'Please ensure you provide title, body, and user.'})
                return;
            }
            const newNote = new Note({title, body, user});
            newNote.save()
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).json({error: err.message}))
        })
        .get((req, res) => {
            const {id} = req.params;
            Note.findById(id)
                .then(note => res.json(note))
                .catch(err => res.status(500).json({error: err.message}))
        })
        

module.exports = router;