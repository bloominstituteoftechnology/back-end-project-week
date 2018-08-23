const express = require('express');
const db = require('./../data/helpers/postsDB');
const jwt = require('jsonwebtoken');
const { secret } = require('./user');

const router = express.Router();

function checkLogIn (req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decoded) => {
            next()
        })
    } else {
        return res.status(401).json({error: 'You must be logged in to view notes.'})
    }
}

router.get('/', checkLogIn, (req, res) => {
    const token = req.headers.authorization;
    if(token) {
        var decoded = jwt.decode(token, {complete: true});
    console.log(decoded.payload)
    const userId = decoded.payload.id;
    db.get(userId)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The posts could not be retrieved.'})
    })
} else {
    return res.status(401).json({error: 'You must be logged in to view notes.'})
}
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getById(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The post could not be retrieved.'})
    })
})

router.post('/', (req, res) => {
    const {title, textBody} = req.body;
    const token = req.headers.authorization;
        var decoded = jwt.decode(token, {complete: true});
    console.log(decoded.payload)
    const userId = decoded.payload.id;
    const post = {title, textBody, userId}
    if(!title) {
        res.status(400).json({error: 'You must provide a title.'})
    }
    db.insert(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving post to the database.'})
    })
})

router.put('/:id', (req, res) => {
    const updated = req.body;
    const id = req.params.id;
    db.update(id, updated)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving post to the database.'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting the post.'})
    })
})

module.exports = router;