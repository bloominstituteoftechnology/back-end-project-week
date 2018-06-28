const express = require('express');
const User = require('./User.js');
const router = express.Router();
const jwt = require('jsonwebtoken');
let jwtSecret = '';

if (process.env.NODE_ENV === 'dev') {
    const config = require('../config.js');
    jwtSecret = config.secret.jwtSecret;
} else {
    jwtSecret = process.env.jwtSecret;
}

router
    .route('/')
    .post((req, res) => {
        const { username, password } = req.body;
        if (username && password) {
            User.create({ username, password })
                .then(response => {
                    return res.status(201).json({ message: 'Your account is created.' })
                })
                .catch(err => {
                    return res.status(500).json({ message: err.message })
                })
        } else {
            return res.status(404).json({ message: 'Username and password are missing.' })
        }
    })

router
    .route('/login')
    .post((req, res) => {
        const { username, password } = req.body;
        User.findOne({ username }, (err, user) => {
            // check if user has existed account
            if (err) {
                return res.status(403).json({ message: 'Invalid Username/Password' });

            }
            if (user === null) {
                return res.status(422).json({ message: 'No user with that username in our DB' });

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
                    const token = jwt.sign(payload, jwtSecret, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    // sends the token back to the client
                    res.status(200).json({ message: 'You are logged in', username: user.username, token: token });
                }
                else {
                    res.status(422).json({ error: 'Wrong password.' });
                }
            })
        });
    })

router
    .route('/revisit')
    .post((req, res) => {
        let token = req.headers.authorization;

        if (token) {
            token = token.replace('Bearer ', '');
            //verify token
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: 'You shall not pass!' })
                } else {
                    return res.status(200).json({ message: 'You are auto-signed in' })
                }
            })
        }
        else {
            return res.status(401).json({ message: 'You shall not pass!' })
        }

    })

module.exports = router;
