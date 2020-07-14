const express = require('express');
const db = require('./../data/helpers/tagsDB');

const router = express.Router();


router.get('/', (req, res) => {
    db.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The tags could not be retrieved.'})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.getById(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The tag could not be retrieved.'})
    })
})

router.post('/', (req, res) => {
    const tag = req.body;
    db.insert(tag)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving tag to the database.'})
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
        res.status(500).json({error: 'There was an error saving changes to the database.'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting the tag.'})
    })
})

module.exports = router;

/*router.post('/posttags', (req, res) => {
    const {tagId, postId} = req.body;
    db.insertPT(tagId, postId)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving tag to the database.'})
    })
})*/

/*router.get('/posttags', (req, res) => {
    db.getPostTags()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The tags could not be retrieved.'})
    })
})*/