const express = require('express');

const router = express.Router();

const dbFunc = require('../db/db.js')

router.use(express.json());

// from api
router.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN Backend API is running."})
})

router.get('/notes/', (req, res) => {
    dbFunc.getNotes().then(notes => {
        res.status(200).json(notes)
    }).catch(err => res.status(500).json({message: 'There was an error with the server.', err: err
    }))
})

router.get('/notes/:id', (req, res) => {
    dbFunc.getNotes(req.params.id).then(note => {
        res.status(200).json(note)
    }).catch(err => res.status(500).json({message: 'There was an error with the server.', err: err
    }))
})

router.post('/notes/', (req, res) => {
    //check for title and text body and return appropriate messages before sending to database
    dbFunc.addNote(req.body).then(id => {
        res.status(201).send(id)
    })
})

module.exports = router