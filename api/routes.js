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
    const {textBody} = req.body
    const {title} = req.body
    const {id} = req.body
    if(!id){
        if(title){
            if(textBody){
                dbFunc.addNote(req.body).then(id => {
                    res.status(201).send(id)
                })
            } else {
                res.status(400).send('Please include a a textBody in your request.')
            }
        } else {
            res.status(400).send('Please include a title in your request and try again.')
        }
    } else {
        res.status(400).send('Please do not include an id in your request. An id will be automatically assigned.')
    }
    //check for title and text body and return appropriate messages before sending to database
    
})

module.exports = router