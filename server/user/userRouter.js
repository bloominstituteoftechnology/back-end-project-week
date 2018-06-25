const express = require('express');
const User = require('./User.js');
const router = express.Router();

router
    .route('/')
// .post((req, res) => {
//     const { username, password } = req.body;
//     User.create({ username, password })
//         .then(response => res.status(201).json({ data: response }))
//         .catch(err => res.status(500).json({ message: err }))
// })

module.exports = router;
