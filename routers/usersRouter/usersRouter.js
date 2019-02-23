const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('../../auth/authenticate');
const express = require('express');
const router = express.Router();
const usersDB = require('../../users/usersModel.js');

//Get Users
router.get('/users', async(req,res) => {
    await usersDB.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to find users.' });
        });
});

//Get User by ID
router.get('/users/:id', async(req, res) => {
    const { id } = req.params;
    await usersDB.get(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'This user can not be found. '});
        });
});

// Post registering user
router.post('/register', async(req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 16);
    const token = generateToken(user)
    await usersDB.insert(user)
        .then(ids => {
            res.status(201).json({id: ids[0], token});
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to create user.  Please make sure you have a username and password. '});
    });
});

// Post login in user
router.post('/login', async(req, res) => {
    const credentials = req.body;
     await usersDB.findByUsername(credentials.username)
        .then(users => {
            if (users && bcrypt.compareSync(credentials.password, users[0].password)) {
                const token = generateToken(users)
                res.status(200).json({ users, token });
                
            }
            else {
                res.status(404).json({ errorMessage: 'Invalid username or password.' });
            }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to login. '});
    });
});

// Editing user data
router.put('/users/:id', async(req, res) => {
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

// Deleting users
router.delete('/users/:id', async (req, res) => {
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