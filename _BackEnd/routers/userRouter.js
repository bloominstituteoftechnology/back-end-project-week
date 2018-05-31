// Import router extention & user Model
const router = require('express').Router();
const User = require('../models/userModel');

// Endpoint (1) Post User
router.post('/', function post(req, res) {
    const userData = req.body;
    const user = new User(userData);

    user
        .save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Endpoint (2) Get All Users
router.get('/', function (req, res) {
    User.find().then(users => {
        res.status(200).json(users);
    });
});

// Endpoint (3) Get Users by ID
router.get('/:id', function get(req, res) {
    const { id } = req.params;

    User.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Endpoint (4) Delete Users by Id
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    User
        .findByIdAndRemove(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Endpoint (5) Edit (put) Users by Id
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    
    const options = {
        new: true,
    };

    User
        .findByIdAndUpdate(id, updatedUser, options)
        .then(user => {
            if(user) {
                res.status(200).json(updatedUser)
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;