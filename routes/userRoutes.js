require('dotenv').load()
const express = require('express')
const router = require('express').Router()

const User = require('../models/userModel.js');

const server = express()


router.post('/register', function(req, res) {
    const { username, password } = req.body
    User.create(req.body)
    .then(user => {
        res.status(201).json({ username })
    })
    .catch(err => res.status(500).json(err))
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
    .then(user => {
        if (user) {
            user.validatePassword(password)
                .then(passwordMatch => {
                    if (passwordMatch) {
                        res.status(200).json({ message: `Welcome to Lambda Take Note, ${user.username}!` })
                    } else {
                        res.status(401).send('Not today.')
                    }
                })
                .catch(err => {
                    res.send('database error');
                });
            } else {
                res.status(401).send('Not today.')
            }
    })
    .catch(err => {
        res.send(err)
    });
});

module.exports = router;