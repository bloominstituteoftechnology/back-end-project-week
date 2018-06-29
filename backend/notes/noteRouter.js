const express =  require('express');
const Note = require('./Note.js');
const router = express.Router();
const mongoose =  require('mongoose');


router 
    .route('/')
        .post((req, res) => {
            const {title, body, userId} = req.body;
            if (!title || !body || !userId) {
                res.status(400).json({errMessage: 'Please ensure you provide title, body, and user.'})
                return;
            }
            Note.create(req.body)
                .then(output => res.status(201).json(output))
                .catch(err => res.status(500).json({error: err.message}));
        })
router
    .route('/:id')
        .get((req, res) => {
            const {id} = req.params;
            console.log(req);
            Note.findById(id)
            // .populate('user')//maybe this need not be there?
                .then(note => res.json(note))
                .catch(err => res.status(500).json({error: err.message}))
        })
        

module.exports = router;