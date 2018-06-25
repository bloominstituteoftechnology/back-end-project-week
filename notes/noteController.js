const router = require('express').Router();

const Notes = require('./noteModel');

// base route = '/note'

router
    .route('/create')
    .post((req, res) => {
        const newNote = (new Notes({ title, textBody, tags } = req.body));
        if (!title || !textBody){
            res.status(400).json({ errorMessage: 'Please provide a title and textBody'});
            return;
        } else {
            newNote.save()
                .then(note => res.status(201).json(note))
                .catch(err => res.status(500))
        }
    })

module.exports = router;