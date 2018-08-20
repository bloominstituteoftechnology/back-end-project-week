const express = require('express');
const db = require('./../data/helpers/postsDB');

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The posts could not be retrieved.'})
    })
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
    const post = req.body;
    const {title} = req.body;
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