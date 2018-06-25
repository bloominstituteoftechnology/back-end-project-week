const router = require('express').Router();
const Note = require('./Note');

router
    .route('/')
    .get((req, res) => {
        Note
            .find()
            .select('title')
            .then(entriesNote => {
                res.status(200).json(entriesNote);
            })
            .catch(err => res.status(500).json({message}));
    })

module.exports = router;