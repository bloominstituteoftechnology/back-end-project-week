const express = require('express');
const db = require('../data/db');
const router = express.Router();

/* 
 Make get endpoint to get all notes in DB
 Make a get endpoint for note/:id
 Make a note under route /notes/create
 Make a put router to update note/:id
 Make a delete router for note/:ids
*/ 

router.get('/', (req, res) => {
    db('notes').then(notes => {
        res.status(200).json(notes)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params
    db('notes').where(id).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    const { title, content } = req.body
    db('notes').insert({title, content}).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, content} = req.body
    db('notes').where({id: id}).update({title, content}).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('notes').where({id: id}).delete(id).then(note => {
        res.status(200).json(note)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;