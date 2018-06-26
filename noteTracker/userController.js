const express = require('express');
const router = express.Router();

const User = require('./user');

router
.post((req, res) => {
    const { username, password } = req.body;
    const newNote = new Note({ username, password });
newNote
    .save()
    .then(savedUser => {
        res.status(201).json({savedUser});
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
    
});

module.exports = router;