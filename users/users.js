const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const users = require('./usersModel');


router
    .route('/')
    .get((req, res) => {
        users.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            })
    })

    .post((req, res) => {
        const { firstName, lastName } = req.body;
        const charNew = new user.Model({ firstName, lastName });
        charNew
            .save()
            .then(charAdded => {
                res.status(200).json(charAdded);
            })
            .catch(err => {
                res.status(500).json({ error: err });
        })
    })

module.exports = router;

