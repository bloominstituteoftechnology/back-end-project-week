require('dotenv').load()
const router = require('express').Router()

const jwt = require('jsonwebtoken')

const User = require('../models/userModel.js');

const secret = process.env.JW_SECRET

function generateToken(username) {
    const options = {
        expiresIn: '1hr'
    };
    const payload = { username };
    return jwt.sign(payload, secret, options)
}

router.post('/register', function(req, res) {
    const { username, password } = req.body
    User.create(req.body)
    .then(user => {
        const token = generateToken(username)
        res.status(201).json({ username, token })
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
                        const token = generateToken(username)
                        res.status(200).json({ message: `Welcome to Lambda Take Note, ${username}!`})
                    } else {
                        res.status(401).send('invalid credentials')
                    }
                })
                .catch(err => {
                    res.send('database error');
                });
            } else {
                res.status(401).send('invalid credentials')
            }
    })
    .catch(err => {
        res.send(err)
    });
});

module.exports = router;