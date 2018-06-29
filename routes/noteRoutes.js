const router = require('express').Router()

const Note = require('../models/noteModel.js');

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
};

function restricted (req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken
            if (err) {
                return res.status(401).json({ message: 'No notes for you.  Your decoder ring is invalid.' })
            }
            next();
        })
    } else {
        res.status(401).json({ message: 'Hey buddy, where is your hall pass?' })
    }
}

router.get('/', restricted, (req, res) => {
    Note.find({ username: req.username })
        .select('-__v -id')
        .then(notes => {
            res.status(200).json({ notes })
        })
        .catch(err => sendUserError(500, err.message, res))
})

router.post('/', restricted, (req, res) => {
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

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;
    Note.findById(id)
    .select('-__v -author')
        .then(note => {
            if (note !== null) {
                res.status(200).json({ note })
            } else {
                sendUserError(404, "This note is no longer available", res)
            }
        })
        .catch(err => sendUserError(500, err.message, res))
})

router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const updates = req.body
    Note.findByIdAndUpdate(id, updates, { new: true })
        .then(updatedNote => {
            res.status(200).json({ updatedNote })
        })
        .catch(err => {
            sendUserError(500, err.message, res)
        })
})

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
        .then(deletedNote => {
            if (deletedNote !== null) {
                res.json({ deletedNote })
            } else {
                sendUserError(404, "This note has already been removed.", res)
            }
        })
        .catch(err => sendUserError(500, err.message, res))
})

module.exports = router