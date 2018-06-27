const express = require('express');
const router = express.Router();

const users = require('./users.js');

router
    .route('/')
    .get((req, res) => {
        users.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(500).json({ error: 'err' })
            });
    })

    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const charNew = new users({ firstName, lastName, age });
        charNew
            .save()
            .then(charAdded => {
                res.status(201).json(charAdded);
            })
            .catch(err => {
                res.status(500).json({ error: 'err' });
            })
    })

module.exports = router;