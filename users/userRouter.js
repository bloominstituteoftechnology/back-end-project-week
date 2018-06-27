const router = require('express').Router();
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('./User');
const Note = require('../notes/Note');

// const server = express();
const secret = "Can you keep a secret?"

// HTTP METHODS FOR USERS

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

router
    .route('/api/register')
    .post((req, res) => {
        User
            .create(req.body)
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({ username: user.username, token });
            })
            .catch(err => res.status(500).json(err));
    });

router
    .route('/api/login')
    .post((req, res) => {
        const { username, password } = req.body;
        User
            .findOne({ username })
            .then(user => {
                if(user) {
                    user
                        .validatePassword(password)
                        .then(passwordsMatch => {
                        if(passwordsMatch) {
                            const token = generateToken(user);
                            res.status(200).json({ message: `Welcome, ${username}!`, token });
                        } else {
                            res.status(401).send('Invalid credentials');
                        }
                        })
                        .catch(err => {
                            res.send('Error comparing passwords.');
                        });
                } else {
                res.status(401).send('Invalid credentials.');
                }
            })
            .catch(err => {
                res.send(err);
            });
    });

function generateToken(user) {
    const options = {
        expiresIn: '1h',
    };

    const payload = { name: user.username };

    return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res
                    .status(401)
                    .json({ message: 'Not decoded. You shall not pass.' });
            }

            next();
        });
    } else {
        res
            .status(401)
            .json({ Message: 'No token, no entry.' });
    }
}

router
    .route('/api/users')
    .get(restricted, (req, res) => {
        User
            .find({})
            .select('username')
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                return res.status(500).json(err);
            });
    });

router
    .route('/api/users/:_id')    
    .get(restricted, (req, res) => {
        const { id } = req.params;
        User
            .findById(req.params)
            // .select('_id')
            .then(user => res.json(user))
            .catch(err => {
                res.status(500).json(err);
            });
    });

module.exports = router;