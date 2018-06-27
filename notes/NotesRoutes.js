const express = require('express');
const Notes = require('./Notes');
const router = express.Router();


let ObjectID = require('mongodb').ObjectID;



//create note with title and content.
router.post('/api/notes',(req, res) => {
    const note = { title: req.body.body, content: req.body.body, notesDate: req.body.body };
    db.collection('Notes').insert(note, (err, results) => { 
        if (err) {
            res.send({ 'error': 'Error has occured' });
        } else {
            res.send(result.ops[0]);
        }
    })
});
//View a note
router.get('/api/notes/:id',(req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('Notes').findOne(details, (err, item) => {
        if (err) {
            res.send({ 'error': 'Error has occurred' });
        } else {
            res.send(item);
        }
    });
});

router.get('api/notes/:id', (req, res) => {
    const { id } = req.params;
    Notes.findById(id).select('__v-id-notesAuthor')
        .then(note => {
            if (note !== null) {
                res.status(200).json({ note })
            } else {
                res.status(404).json({ message: 'Note no longer available' })
            }
           
        })
        .catch(err => res.status(500).json(err));
});




//remove a note
router.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(422).json({ message: 'NEED an ID' });
    } else {
        Notes.findByIdAndRemove(id)
            .then(note => {
                if (note) {
                    res.status(204).end();
                } else {
                    res.status(404).json({ message: 'Note not found' });
                }
            })
            .catch(err => res.status(500).json(err));
    }
});




//Edit a note
router.put('/api/notes/:id',(req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { title: req.body.body, content: req.body.text };
    db.collection('Notes').update(details, note, (err, result) => {
        if (err) {
            res.send({ 'error': 'Error has occurred' });
        } else {
            res.send('Notes' + id + 'deleted!!!');
        }
        
    })
        .catch(err => res.status(500).json(err));
});



module.exports = router;