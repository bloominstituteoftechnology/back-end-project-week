const router = require('express').Router();
const Note = require('./noteModel');

// "/api/notes" 
//  CRUD = Create Read Update Delete (mongoose) -> Get, GetId, Post, Put, Delete

router
    .route('/')  // Get all notes and Post to this Route
    .get((req, res) => { //DISPLAY LIST OF NOTES
        Note
            .find()
            .then(notes => {
                res.status(200).json(notes);
            })
            .catch(error => {
                res.status(500).json({errorMessage: 'Could Not Retrieve Notes'} )
            });
        })
    .post((req, res) => { //CREATE A NOTE WITH TITLE AND CONTENT
        const note = new noteModel(req.body);

        if(!note.title || !note.noteContent) {
            res.status(400).json({errorMessage: 'Please provide Note Title, and Title Content!'})
        } 
        else {
            note
                .save()
                .then( savedNote => {
                    res.status(201).json(savedNote); // 201 = created
                })
                .catch( error => res.status(500).json({errorMessage: 'Can not save note!'}))
        }
    });

router 
    .route('/:id') // Get Note ID, Update ID, Delete ID from this route
    .get((req, res) => { // VIEW EXISTING NOTE
        Note
            .findById(req.params.id)
            .then(note => {
                res.status(200).json(note)
            })
            .catch(error => {
                res.status(500).json({errorMessage: 'Could not get Note by ID!'})
            })
    })
    .put((req, res) => { // EDIT EXISTING NOTE
        Note
            .findByIdAndUpdate(req.params.id, req.body)
            .then( response => {
                if (response === null) {
                    res.status(404).json({ message: 'not found'});
                } else {
                    res.status(200).json(response)
                }
            })
            .catch(error => {
                if (error.name === 'CastError') {
                    res.status(400).json({
                        message: 'The id provided is invalid, check and try again'
                    });
                } else {
                    res.status(500).json({ errorMessage: 'This Note could not be updated!', error})
                }
            });
    })
    .delete((req, res) => { // DELETE EXISTING NOTE
        Note
            .findByIdAndRemove(id)
            .then(response => {
                if ( response === null) {
                    res.status(404).json({message: 'not found'})
                } else {
                    res.status(200).json(response)
                }
            })
            .catch( error => {
                if (error.name === 'CastError') {
                    res.status(400).json({ message: ' The id provided is INVALID, chack and try again'})
                } else {
                    res.status(500).json({ errorMessage: 'Could not Remove Note!'})
                }
            })
    });