const express = require('express');

const users = require('./usersModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    users
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err));
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await users.findById(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'user not found' });
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', (req, res) => {
    const user = req.body;

    users
        .add(user)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    users
        .update(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: 'No user found to update' });
            } else {
                res.status(200).json(count);
            }
            
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users
        .remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: 'user not found to delete!' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;