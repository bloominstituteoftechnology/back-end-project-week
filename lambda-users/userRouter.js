const express = require('express');
const User = require('./User.js');
const route = express.Router();

router
    .route('/')
    .post((req, res) => {
        const {username, password} = req.body;
        if (!username || !password){
            res.status(400).json({errMessage: 'Please provide both username and password'})
            return;
        }
        const newUser = new User({username, password});
        newU.save()
            .then(result => res.json(result))
            .catch(err => res.status(500).json({error: err.message}));
    });

    module.exports = router;