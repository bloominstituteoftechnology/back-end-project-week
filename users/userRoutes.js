const express = require('express');
const router = express.Router();
const User = require('./User');
const jwt = require('jsonwebtoken');

// Helper Functions
const getTokenForUser = userObject => {
    return jwt.sign(userObject, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(422).json({ Error: 'No token found' })
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ Error: "Token invalid", message: err });
            } else {
                next();
            }
        })
    }
}

// POST - create a new user
router.post('/user', (req,res) => {

    User
    .create(req.body)
    .then(user => {
        const token = getTokenForUser({ username: user.username })
        res.status(201).json({ user, token })
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

// GET - retrieve a specific user using ID
router.get('/user/:id', (req, res) => {
    const id = req.params.id;

    User
    .findById(id).select('-_id -__v')
    .then(user => {
        res.status(200).json({ user })
    })
    .catch(err => {
        res.status(404).json({ Message: "User not found" })
    })
})

// PUT - edit user information 
router.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;

    User
    .findByIdAndUpdate(id, updateUser)
    .then(user => {
        res.status(200).json({ updateUser })
    })
    .catch(err => {
        res.status(400).json({ Message: "User not found" })
    })
})

// DELETE - deletes a user
router.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    User
    .findByIdAndRemove(id)
    .then(user => {
        res.status(200).send('User is deleted')
    })
    .catch(err => {
        res.status(404).json({ Error: 'User not found' })
    })
})

module.exports = router;