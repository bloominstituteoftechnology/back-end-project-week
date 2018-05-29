// Import router extention & user Model
const router = require('express').Router();
const User = require('../models/userModel');

router
    .route('/')
    .get()
    .post(post);

router
    .route('/:id')
    .get((req, res) => {
        res.status(200).json({ route: '/api/users/' + req.params.id });
    })
    .delete((req, res) => {
        res.status(200).json({ status: 'work on delete!' });
    })
    .put((req, res) => {
        res.status(200).json({ status: 'work on put' })
    })

// function get(req, res) {
//     res.status(200).json({ route: '/api/users/' });
// }

function post(req, res) {
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
}

module.exports = router;