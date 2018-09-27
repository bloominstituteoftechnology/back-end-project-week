const express = require('express');
const db = require('../db/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('notes')
       .then(notes => {
       res.status(200).json(notes);
       })
       .catch(err => res.status(500).json({ errorMessage: 'The notes could not be retrieved.' }));
 });
 
router.get('/:id', (req, res) => {
    const { id } =req.params;
    db('notes')
        .where({ id })
        .then(note => {
            if( note.length === 0) {
                res.status(404).json({ error: 'The note with the specified ID does not exist.' })
            }
            else {
                res.status(200).json(note);
            }  
        })
        .catch(err => {
            console.error('error', err)
            res.status(500).json({ error: 'The note\'s information could not be retrieved.' });
        });
});
        
router.post('/', (req, res) => {
    const note = req.body;

    db.insert(note)
        .into('notes')
        .then(id => {
        res.status(201).json(id);
        })
        .catch(err => res.status(500).json({ errorMessage: 'There was an error while saving the note to the database. Try changing the title. Title and text body is required.' }));
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('notes')
        .where('id', '=', id)
        .update(changes)
        .then(count => {
        res.status(200).json({ message: `Update succesful. ${count} record(s) updated.` })
        })
        .catch(err => {
        res.status(500).json({ errorMessage: 'Update failed.'})
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('notes')
        .where({ id })
        .del()
        .then(count => {
        res.status(200).json({ message: `${count} record(s) deleted.`})
        })
        .catch(err => {
        res.status(500).json({ errorMessage: 'Oops! There was an error when trying to delete the record.' })
    });
});

module.exports = router;