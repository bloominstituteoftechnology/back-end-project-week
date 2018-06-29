require('dotenv').load()
const express = require('express')
const router = require('express').Router()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const User = require('../models/userModel.js');

const server = express()

server.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    secure: false,
    saveUninitialized: false,
    resave: true,
    name: 'none',
    store: new MongoStore({
        url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds217671.mlab.com:17671/sessions`,
        ttl: 60 * 10,
    })
}))
router.post('/register', function(req, res) {
    const { username, password } = req.body
    User.create(req.body)
    .then(user => {
        req.session.username = user.username
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
                        req.session.username = user.username
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