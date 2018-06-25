const router = require('express').Router()

const Note = require('../models/noteModel.js');

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
};

router.get('/', (req, res) => {
    Note.find()
        .select('-__v -id')
        .then(notes => {
            res.status(200).json({ notes })
        })
        .catch(err => sendUserError(500, err.message, res))
})

router.post('/', (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        sendUserError(400, "All notes must contain a title and body", res)
    } else {
    Note.create(req.body)
        .then(savedNote => {
            res.status(201).json({ savedNote })
        })
        .catch(err => {
            sendUserError(500, err.message, res)
        })
    }
})

module.exports = router