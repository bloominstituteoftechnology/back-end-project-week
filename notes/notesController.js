const router = require('express').Router();
const Note = require('./notesModel');

router 
    .route('/')
    .get((req, res) => {
        Note.find({})
            .then(notes => {
                res.status(200).json(notes);
            })
            .catch(err => {
                res.status(500).json({Error: 'Error getting notes'});
            });
    });

router
    .route('/add')
    .post((req, res) => {
        const note = new Note(req.body);

        note
            .save()
            .then(savedNote => {
                res.status(201).json(savedNote);
            })
            .catch(err => res.status(500).json({Error: 'Error saving note'}));
    });

router
    .route('/:id')
    .get((req, res) => {
        Note
            .findById(req.params.id)
            .then(note => {
                res.status(200).json(note);
            })
            .catch(err => {
                res.status(500).json({Error: 'error finding note'})
            });
    })

    .delete((req, res) => {
        const { id } = req.params
        Note
            .findByIdAndRemove(id)
            .then(removedNote => res.status(200).json(removedNote))
            .catch( err => res.status(500).json({Error: 'error removing note'}));
    })

    .put((req, res) => {
        const { id } = req.params;
        const note = req.body;

        Note
            .findByIdAndUpdate(id, note)
            .then(updatedNote => res.status(200).json(updatedNote))
            .catch(err => res.status(500).json({Error: 'error updating note'}));        
    });


module.exports = router;