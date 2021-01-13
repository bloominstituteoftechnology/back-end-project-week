const express = require('express')
const router = express.Router();

const bcrypt = require('bcryptjs');

const { authenticate } = require('./../config/middlewares.js')


const db = require('../database/dbConfig.js')

/***** NOTES GET *****/
router.get('/', authenticate,  (req, res) => {
    db('notes')
            .then(notes => {
                res.status(200).json(notes); 
             })
            .catch(error => {
                response.status(500).json({error : 'The notes data could not be retrieved'})
            })
})

/***** PROJECTS GET BY ID *****/
router.get('/:id', (req, res) => {
    db('notes')
             .where({id : req.params.id})
             .then(note => {
                if(note.length < 1) {
                    res.status(500).json({error : 'Note not present for given id'})
                } else res.status(200).json(note); 
                
              })
             .catch(error => {
                    res.status(500).json({error : 'The data could not be retrieved'})
              })  
})
    
/***** CREATE NOTE-  POST *****/
router.post('/', (req, res) => {
    if(req.body.title && req.body.content) {
            db('notes')
                    .insert(req.body)
                    .then(id => {
                            res.status(201).json(id);
                     })
                    .catch(error => {
                            res.status(500).json({message : 'error creating note',error});
                     })
        } else {
            res.status(422).json({message : 'Need correct data to create note..'})
        }
    
})

/***** SINGLE NOTE DELETE *****/
router.delete('/:id', (req, res) => {
    db('notes')
            .where({id : req.params.id})
            .delete(req.params.id)
            .then(count => {
                 count ? res.status(200).json({ message: "note successfully deleted." })
                       : res.status(404).json({ message: "The note with the specified ID does not exist."})
             })
            .catch(error => {
                     res.status(500).json({message : 'error deleting user'})
            })
})

/***** NOTES UPDATE *****/
router.put('/:id', (req, res) => {
    const {title, content} = req.body;
    db('notes')
             .where({id : req.params.id})
             .update(req.body)
             .then(count => {
                    if(count) {
                        res.status(200).json(count);
                    } else {
                        res.status(404).json({ message: "The note with the specified ID does not exist." })
                    }
              })
             .catch(error => {
                    res.status(500).json({ error: "The note information could not be modified." })
              })
})

module.exports = router
