const express = require('express');
const User = require('./userModel');
const router = express.Router();
const bcrypt = require('bcrypt');

router
    .route('/')
        .get((req, res) => {
            User.find()
                .then(user => {
                    res.json(user)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: error.message
                    })
                })
        })

        .post((req, res) => {
            User.create(req.body)
                .then(user => {
                    res.status(201).json(user)
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: error.message
                    })
                })
        })

module.exports = router;