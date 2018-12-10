require('dotenv').config();

const express = require('express');

const jwt = require('jsonwebtoken');

const usersDb = require('../data/helpers/usersHelper.js');

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

module.exports = router;