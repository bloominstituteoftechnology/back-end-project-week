const express = require('express');
const Tag = require('./Tag.js');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Tag
            .find({})
            .then(response => res.status(200).json({ data: response }))
            .catch(err => res.status(500).json(err))
    })
    .post((req, res) => {
        const newTag = req.body
        if (newTag.name) {
            Tag.create(newTag)
                .then(response => res.status(200).json({ data: response }))
                .catch(err => res.status(500).json(err))
        }
        else {
            res.status(400).json({ message: 'Please provide tag name.' })
        }
    })

module.exports = router;
