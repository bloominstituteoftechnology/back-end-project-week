const express = require('express');
const router = express.Router();
const User = require('./User');

// POST - create a new user
router.post('/user', (req,res) => {

    User
    .create(req.body)
    .then(user => {
        res.status(201).json({ user })
    })
    .catch(err => {
        res.status(500).json({ Error: err})
    })
})

// GET - retrieve list of users created
router.get('/users', (req, res) => {

    User
    .find()
    .then(users => {
        res.status(200).json({ users })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

module.exports = router;