const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('../../auth/authenticate');
const express = require('express');
const router = express.Router();
const usersDB = require('../../users/usersModel.js');

router.get('/', async(req,res) => {
    await userDB.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find users.' });
        });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    await usersDB.get(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'This user can not be found. '});
        });
});

router.post('/', async(req, res) => {
    const user = req.body;
    await usersDB.insert(user)
        .then(ids => {
            res.status(201).json(ids)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to create user.  Please make sure you have a username and password. '});
    });
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const user = req.body;
    await usersDB.update(id, user)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to update User. '});
        });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await usersDB.remove(id)
        .then(user => {
            res.json(user);
        }) 
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to delete user. '});
        });
});

module.exports = router;