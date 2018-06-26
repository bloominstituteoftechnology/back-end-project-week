const express = require('express');
const router = express.Router();
const User = require('./User');

function authenticate(req, res, next) {
    if (req.body.password === User.password) {
        next();
    } else {
        res.status(401).send('Incorrect password or username. Please try again.')
    }
}

router
    .route('/login')
    .post(authenticate, (req, res) => {
        res.send('Welcome back!')
    })