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
    const { textBody, title, id } = req.body

    if(!id){
        if(title){
            if(textBody){
                dbFunc.addNote(req.body).then(id => {
                    res.status(201).json(id)
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
})

router.delete('/notes/:id', (req, res) => {
    const { id } = req.params
       
    dbFunc.deleteNote(id).then(count => {
        if(count == 0){
            res.status(400).json('note not deleted. Either this note does not exist, or it was a bad request')
        } else {
            res.status(200).json(count)
        }
    }).catch(err => res.status(500).json({message: 'Note was note deleted', err: err}))
   
})

module.exports = router