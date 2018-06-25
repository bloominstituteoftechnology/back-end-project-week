const router = require('express').Router();

const Note = require('./Note');

router
    .route('/')
    .get((req, res) => {
        Note
            .find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(500).json({ error: error.message });
            });
    })

module.exports = router;