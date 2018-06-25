const router = require('express').Router();

const User = require('./User');

router
    .route('/')
    .get((req, res) => {
        User
            .find()
            .select('-password')
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(500).json({ error: error.message });
            });
    })

module.exports = router;