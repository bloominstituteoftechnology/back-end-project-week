const express = require('express');

const User = require('./UserModel');

const router = express.Router();

router
    .post('/register', (req, res) => {
        console.log('trying...');
        if (req.body.firstName &&
            req.body.lastName &&
            req.body.username &&
            req.body.password) {
            const user = new User(req.body);
            console.log('okay...')
            user
                .save()
                .then(savedUser => res.status(200).json(savedUser))
                .catch(err => res.status(500).json(err));
        } else {
            res.status(422).json({ message: 'Please provide a first name, last name, username, and password when creating a new user.'})
        }
    })
    .get('/users', (req, res) => {
        User
        .find()
        .then(users => {
            res.status(200).json(users)
        }).catch(err => res.status(500).json(err));
    })


module.exports = router;