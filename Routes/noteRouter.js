const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Note = require('../Models/noteModel');

const secret="freezing trap";

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({
                    message: 'Token NOT Decoded'
                })
            }
            next();
        })
    } else {
        res.status(401).json({
            message: 'There is NO Token'
        })
    }
}

router
    .route('/')
    .get((req, res) => {
        Note
            .find()
            .then(listOfNotes => {
                res.status(200).json(listOfNotes)
            })
            .catch(error => {
                res.status(500).json({ 
                    errorMessage: "There was an error getting the Notes", 
                    details: error.message 
                })
            })
    })
    .post((req, res) => {
        const { title, textBody } = req.body;
        const newNote = new Note({ title, textBody });
        newNote
            .save()
            .then(new_note => {
                res.status(201).json({ 
                    sucess: "New Note Added", 
                    new_note 
                });
            })
            .catch(error => {
                res.status(500).json({ 
                    errorMessage: "There was an error posting the Note", 
                    details: error.message 
                })
            })
    })
router
    .route('/:id')
    .get((req, res) => {
        Note
            .findById(req.params.id)
            .then(note => {
                if(!note) {
                    res.status(404).json({ 
                        errorMessage: "no Note with that ID exists" 
                    })
                } else {
                    res.status(200).json(note)
                }
            })
            .catch(error => {
                res.status(500).json({ 
                    errorMessage: "This Note Doesnt Exist", 
                    details: error.message 
                })
            })
    })
    .delete((req, res) => {
        Note
            .findByIdAndRemove(req.params.id)
            .then(note => {
                if(!note) {
                    res.status(404).json({ 
                        errorMessage: "no Note with that ID exists" 
                    })
                } else {
                    res.json({ 
                        status: "Note Removed"
                    })
                }
            })
            .catch(error => {
                res.status(500).json({ 
                    errorMessage: "This Note Doesnt Exist", 
                    details: error.message 
                })
            })
    })
    .put((req, res) => {
        const updates = ({ title, textBody } = req.body)
        Note
            .findByIdAndUpdate(req.params.id, updates, { new: true })
            .then(note => {
                if(!note) {
                    res.status(404).json({
                        errorMessage: "This Note Doesnt Exist"
                    })
                } else {
                    res.json({
                        success: "Note Updated",
                        resource: note
                    })
                }
            })
            .catch(error => {
                res.status(500).json({ 
                    errorMessage: "This Note Doesnt Exist", 
                    details: error.message 
                })
            })
    })

module.exports = router;
