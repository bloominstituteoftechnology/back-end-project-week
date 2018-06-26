const express = require('express');
const User = require('./User.js');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const { jwtSecret } = config.secret;

router
    .route('/')
    .post((req, res) => {
        const { username, password } = req.body;
        User.create({ username, password })
            .then(response => {
                return res.status(201).json({ message: 'Your account is created.' })
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    })

router
    .route('/login')
    .post((req, res) => {
        const { username, password } = req.body;
        User.findOne({ username }, (err, user) => {
            // check if user has existed account
            if (err) {
                res.status(403).json({ message: 'Invalid Username/Password' });
                return;
            }
            if (user === null) {
                res.status(422).json({ message: 'No user with that username in our DB' });
                return;
            }
            user.checkPassword(password, (nonMatch, hashMatch) => {
                if (nonMatch) {
                    res.status(500).json({ error: 'brcypt error' });
                    return;
                }
                if (hashMatch) {
                    const payload = {
                        username: user.username
                    };
                    // creates our JWT with a secret and a payload and a hash.
                    const token = jwt.sign(payload, jwtSecret);
                    // sends the token back to the client
                    res.status(200).json({ message: 'You are logged in', token: token });
                }
                else {
                    res.status(422).json({ error: 'Wrong password.' });
                }
            })
        });
    })

module.exports = router;
