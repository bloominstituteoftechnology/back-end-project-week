const express = require('express');

const usersDb = require('../data/helpers/usersHelper.js');

const router = express.Router();

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

module.exports = router;