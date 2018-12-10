require('dotenv').config();

const express = require('express');

const jwt = require('jsonwebtoken');

const usersDb = require('../data/helpers/usersHelper.js');
const notesDb = require('../data/helpers/notesHelper.js');

const router = express.Router();

// generates jwt
const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret, options);
};

// [GET] /api/users
router.get('', (req, res) => {
    usersDb.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving users' });
        });
});

// [POST] /api/users/register
router.post('/register', (req, res) => {
    const newUser = req.body;
    usersDb.registerUser(newUser)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            if (err.errno === 19 && err.code === 'SQLITE_CONSTRAINT') {
                res.status(409).json({ message: 'Username already exists' });
            } else {
                res.status(500).json({ message: 'Error registering new user' });
            }
        })
});

// [POST] /api/users/:id/newNote
router.post('/:id/newNote', (req, res) => {
    const user_id = req.params.id;
    const newNote = req.body;

    notesDb.addNote(newNote, user_id)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            if (err.errno === 1 && err.code === 'SQLITE_ERROR') {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(500).json(err);
            }
        });
});

module.exports = router;